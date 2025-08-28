import { GoogleGenerativeAI, GenerativeModel, } from '@google/generative-ai'
import { GeminiConfig } from '@/config/gemini'

export class GeminiService {
  private model: GenerativeModel

  constructor() {
    const genAI = new GoogleGenerativeAI(GeminiConfig.apiKey)
    this.model = genAI.getGenerativeModel({ model: GeminiConfig.model })
  }

  /**
   * Generates JSON text of an address from a raw address string.
   * @param address Address in string format.
   * @returns Promise<any> Returns the JSON string from Gemini.
 */
  public async extractAddress(address: string): Promise<any> { 
    const prompt = await this.prompting(address) 
    const response = await this.model.generateContent(prompt) 
    let text = response.response.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    text = text.replace(/```json\s*|```/g, '').trim()
    const jsonData = JSON.parse(text)
    return jsonData
  }

  /**
   * Generates a prompt for address extraction.
   * @param address Address in string format.
   * @returns string The formatted prompt.
  */

  private async prompting(address: string): Promise<string> {
    const ADDRESS_PROMPT = 
    `You are a system that extracts Indonesian address data into structured JSON.
      The JSON must follow this structure:

      {
        "street": null,
        "rt": null,
        "rw": null,
        "village": null,
        "district": null,
        "regency": null,
        "province": null,
        "postalCode": null,
        "country": "Indonesia"
      }

      Rules:
      - If a piece of information is missing, set the value to null (not an empty string).
      - Always return valid JSON only, with no extra explanation.
      - Normalize abbreviations:
          "Jl." -> "Jalan"
          "Kec." -> "Kecamatan"
          "Kab." -> "Kabupaten"
          "Ps." -> "Pasar"
          and other common abbreviations.
      - RT/RW must be extracted if available, otherwise set to null.
      - Postal code must contain digits only.
      - Field names must stay consistent in English, but reflect the Indonesian administrative structure.
      - Normalize village names without the prefix "Kelurahan" or "Desa".
      - For regency, remove the prefix "Kota" or "Kabupaten"; use only the core name (e.g., "Kota Medan" -> "Medan").
      - Normalize province names to match official Indonesian provinces (e.g., "Sumatra Utara" -> "Sumatera Utara", "Jakrta" -> "DKI Jakarta").

      Example Input:
      "Jl. Sindoro No.17, Pusat Ps., Kec. Medan Kota, Kota Medan, Sumatra Utara 20211"

      Example Output:
      {
        "street": "Jalan Sindoro No.17",
        "rt": null,
        "rw": null,
        "village": "Pusat Pasar",
        "district": "Medan Kota",
        "regency": "Medan",
        "province": "Sumatera Utara",
        "postalCode": 20211,
        "country": "Indonesia"
      }

      Now extract the following address into JSON:`

    return `${ADDRESS_PROMPT} "${address}"`
  }

}