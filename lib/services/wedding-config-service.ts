import { promises as fs } from "fs";
import path from "path";
import type { EditableWeddingConfig } from "../types/wedding-config";

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
        couple: {
          bride: {
            base: {
              firstName: "Hermione",
              lastName: "Granger",
              fullName: "Hermione Granger",
              phone: "+1 555 123 4567",
            },
            pl: {
              firstName: "Hermiona",
            },
            uk: {
              firstName: "Герміона",
              lastName: "Ґрейнджер",
              fullName: "Герміона Ґрейнджер",
            },
          },
          groom: {
            base: {
              firstName: "Shrek",
              lastName: "Ogre",
              fullName: "Shrek Ogre",
              phone: "+1 555 765 4321",
            },
            pl: {
              lastName: "Ogr",
              fullName: "Shrek Ogr",
            },
            uk: {
              firstName: "Шрек",
              lastName: "Огр",
              fullName: "Шрек Огр",
            },
          },
        },
        ceremony: {
          time: "15:00",
          googleMapsUrl: "https://maps.google.com/?q=Enchanted+Forest+Chapel",
          base: {
            locationName: "Enchanted Forest Chapel",
            address: "123 Forest Lane, Fairytale Kingdom",
          },
          pl: {
            locationName: "Kaplica w Zaczarowanym Lesie",
            address: "Leśna 123, Baśniowe Królestwo",
          },
          uk: {
            locationName: "Каплиця Зачарованого Лісу",
            address: "Лісова 123, Казкове Королівство",
          },
        },
        reception: {
          googleMapsUrl: "https://maps.google.com/?q=Dragon's+Keep+Ballroom",
          base: {
            locationName: "Dragon's Keep Ballroom",
            address: "456 Swamp Road, Far Far Away",
          },
          pl: {
            locationName: "Sala Balowa Smoczej Twierdzy",
            address: "Bagnista 456, Bardzo Bardzo Daleko",
          },
          uk: {
            locationName: "Бальна Зала Драконячої Фортеці",
            address: "Болотна 456, Дуже Дуже Далеко",
          },
        },
        date: {
          year: 2026,
          month: 12,
          day: 25,
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
