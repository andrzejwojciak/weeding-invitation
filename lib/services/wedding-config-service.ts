import { promises as fs } from "fs";
import path from "path";
import type { EditableWeddingConfig } from "../types/wedding-config";
import { weddingConfig as defaultConfig } from "../config/wedding";

const CONFIG_FILE = path.join(process.cwd(), "data", "wedding-config.json");

export class WeddingConfigService {
  private static instance: WeddingConfigService;

  private constructor() {}

  static getInstance(): WeddingConfigService {
    if (!WeddingConfigService.instance) {
      WeddingConfigService.instance = new WeddingConfigService();
    }
    return WeddingConfigService.instance;
  }

  /**
   * Ensures the data directory exists
   */
  private async ensureDataDir(): Promise<void> {
    const dataDir = path.dirname(CONFIG_FILE);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  /**
   * Gets the current wedding configuration
   */
  async getConfig(): Promise<EditableWeddingConfig> {
    try {
      await this.ensureDataDir();
      const content = await fs.readFile(CONFIG_FILE, "utf-8");
      return JSON.parse(content);
    } catch {
      // Return default config if file doesn't exist
      return {
        couple: defaultConfig.couple,
        ceremony: {
          time: defaultConfig.ceremony.time,
          locationName: defaultConfig.ceremony.locationName,
          address: defaultConfig.ceremony.address,
          googleMapsUrl: "https://maps.google.com/?q=Enchanted+Forest+Chapel",
        },
        reception: {
          locationName: defaultConfig.reception.locationName,
          address: defaultConfig.reception.address,
          googleMapsUrl: "https://maps.google.com/?q=Dragon's+Keep+Ballroom",
        },
      };
    }
  }

  /**
   * Updates the wedding configuration
   */
  async updateConfig(config: EditableWeddingConfig): Promise<void> {
    await this.ensureDataDir();
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  }
}
