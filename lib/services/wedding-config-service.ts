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
        couple: {
          bride: {
            en: {
              firstName: "Hermione",
              lastName: "Granger",
              fullName: "Hermione Granger",
              phone: "+1 555 123 4567",
            },
            pl: {
              firstName: "Hermiona",
              lastName: "Granger",
              fullName: "Hermiona Granger",
              phone: "+48 555 123 456",
            },
            uk: {
              firstName: "Герміона",
              lastName: "Ґрейнджер",
              fullName: "Герміона Ґрейнджер",
              phone: "+380 55 123 4567",
            },
          },
          groom: {
            en: {
              firstName: "Shrek",
              lastName: "Ogre",
              fullName: "Shrek Ogre",
              phone: "+1 555 765 4321",
            },
            pl: {
              firstName: "Shrek",
              lastName: "Ogr",
              fullName: "Shrek Ogr",
              phone: "+48 555 765 432",
            },
            uk: {
              firstName: "Шрек",
              lastName: "Огр",
              fullName: "Шрек Огр",
              phone: "+380 55 765 4321",
            },
          },
        },
        ceremony: {
          time: defaultConfig.ceremony.time,
          googleMapsUrl: "https://maps.google.com/?q=Enchanted+Forest+Chapel",
          en: {
            locationName: "Enchanted Forest Chapel",
            address: "123 Magic Lane, Fairy Tale Village",
          },
          pl: {
            locationName: "Kaplica Zaczarowanego Lasu",
            address: "Magiczna 123, Baśniowa Wioska",
          },
          uk: {
            locationName: "Каплиця Зачарованого Лісу",
            address: "Магічна 123, Казкове Село",
          },
        },
        reception: {
          googleMapsUrl: "https://maps.google.com/?q=Dragon's+Keep+Ballroom",
          en: {
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
          year: defaultConfig.date.year,
          month: defaultConfig.date.month,
          day: defaultConfig.date.day,
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
