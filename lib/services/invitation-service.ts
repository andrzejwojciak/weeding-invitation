import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { Invitation, CreateInvitationDto } from "../types/invitation";

const DATA_DIR = path.join(process.cwd(), "data");
const MAX_LINES_PER_FILE = 1000;
const FILE_PREFIX = "invitations";

/**
 * InvitationService - File-based storage service with automatic sharding
 * Manages invitations across multiple text files with max 1000 lines each
 */
export class InvitationService {
  private static instance: InvitationService;

  private constructor() {}

  static getInstance(): InvitationService {
    if (!InvitationService.instance) {
      InvitationService.instance = new InvitationService();
    }
    return InvitationService.instance;
  }

  /**
   * Ensures the data directory exists
   */
  private async ensureDataDir(): Promise<void> {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
  }

  /**
   * Gets all shard file paths sorted by index
   */
  private async getShardFiles(): Promise<string[]> {
    await this.ensureDataDir();

    try {
      const files = await fs.readdir(DATA_DIR);
      const shardFiles = files
        .filter((file) => file.startsWith(FILE_PREFIX) && file.endsWith(".txt"))
        .sort((a, b) => {
          const numA =
            parseInt(a.replace(`${FILE_PREFIX}_`, "").replace(".txt", "")) || 0;
          const numB =
            parseInt(b.replace(`${FILE_PREFIX}_`, "").replace(".txt", "")) || 0;
          return numA - numB;
        })
        .map((file) => path.join(DATA_DIR, file));

      return shardFiles.length > 0 ? shardFiles : [];
    } catch {
      return [];
    }
  }

  /**
   * Gets the current active shard file for writing
   * Creates a new shard if the current one is full
   */
  private async getActiveShardFile(): Promise<string> {
    const shardFiles = await this.getShardFiles();

    if (shardFiles.length === 0) {
      const firstFile = path.join(DATA_DIR, `${FILE_PREFIX}_1.txt`);
      await fs.writeFile(firstFile, "", "utf-8");
      return firstFile;
    }

    const lastFile = shardFiles[shardFiles.length - 1];
    const content = await fs.readFile(lastFile, "utf-8");
    const lines = content.split("\n").filter((line) => line.trim());

    if (lines.length >= MAX_LINES_PER_FILE) {
      // Create next shard
      const lastIndex =
        parseInt(
          path
            .basename(lastFile)
            .replace(`${FILE_PREFIX}_`, "")
            .replace(".txt", ""),
        ) || 1;
      const nextFile = path.join(
        DATA_DIR,
        `${FILE_PREFIX}_${lastIndex + 1}.txt`,
      );
      await fs.writeFile(nextFile, "", "utf-8");
      return nextFile;
    }

    return lastFile;
  }

  /**
   * Reads all invitations from all shard files
   */
  async getAllInvitations(): Promise<Invitation[]> {
    const shardFiles = await this.getShardFiles();
    const invitations: Invitation[] = [];

    for (const file of shardFiles) {
      try {
        const content = await fs.readFile(file, "utf-8");
        const lines = content.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const invitation = JSON.parse(line) as Invitation;
            invitations.push(invitation);
          } catch {
            // Skip malformed lines
          }
        }
      } catch {
        // Skip unreadable files
      }
    }

    return invitations;
  }

  /**
   * Finds an invitation by slug
   */
  async getBySlug(slug: string): Promise<Invitation | null> {
    const invitations = await this.getAllInvitations();
    return invitations.find((inv) => inv.slug === slug) || null;
  }

  /**
   * Finds an invitation by ID
   */
  async getById(id: string): Promise<Invitation | null> {
    const invitations = await this.getAllInvitations();
    return invitations.find((inv) => inv.id === id) || null;
  }

  /**
   * Generates a unique slug from recipient name
   */
  private generateSlug(name: string): string {
    const baseSlug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${baseSlug}-${randomSuffix}`;
  }

  /**
   * Creates a new invitation
   */
  async create(dto: CreateInvitationDto): Promise<Invitation> {
    const invitation: Invitation = {
      id: uuidv4(),
      slug: this.generateSlug(dto.recipientName),
      recipientName: dto.recipientName,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    const activeFile = await this.getActiveShardFile();
    const line = JSON.stringify(invitation) + "\n";
    await fs.appendFile(activeFile, line, "utf-8");

    return invitation;
  }

  /**
   * Updates an invitation (rewrites all files with updated data)
   */
  async update(
    id: string,
    updates: Partial<Invitation>,
  ): Promise<Invitation | null> {
    const invitations = await this.getAllInvitations();
    const index = invitations.findIndex((inv) => inv.id === id);

    if (index === -1) {
      return null;
    }

    invitations[index] = { ...invitations[index], ...updates };

    // Rewrite all shards
    await this.rewriteShards(invitations);

    return invitations[index];
  }

  /**
   * Marks an invitation as read
   */
  async markAsRead(slug: string): Promise<boolean> {
    const invitation = await this.getBySlug(slug);
    if (!invitation) {
      return false;
    }

    await this.update(invitation.id, { isRead: true });
    return true;
  }

  /**
   * Deletes an invitation
   */
  async delete(id: string): Promise<boolean> {
    const invitations = await this.getAllInvitations();
    const filtered = invitations.filter((inv) => inv.id !== id);

    if (filtered.length === invitations.length) {
      return false; // Not found
    }

    await this.rewriteShards(filtered);
    return true;
  }

  /**
   * Rewrites all shards with the given invitations
   */
  private async rewriteShards(invitations: Invitation[]): Promise<void> {
    // Delete all existing shards
    const existingFiles = await this.getShardFiles();
    for (const file of existingFiles) {
      await fs.unlink(file);
    }

    // Write new shards
    let shardIndex = 1;
    for (let i = 0; i < invitations.length; i += MAX_LINES_PER_FILE) {
      const chunk = invitations.slice(i, i + MAX_LINES_PER_FILE);
      const filePath = path.join(DATA_DIR, `${FILE_PREFIX}_${shardIndex}.txt`);
      const content = chunk.map((inv) => JSON.stringify(inv)).join("\n") + "\n";
      await fs.writeFile(filePath, content, "utf-8");
      shardIndex++;
    }
  }
}
