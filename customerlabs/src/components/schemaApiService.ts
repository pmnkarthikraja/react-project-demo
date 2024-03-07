import axios from "axios";

interface SchemaAPI {
  sendSchema: (s: string) => Promise<void> | undefined
}

class SchemaAPIService implements SchemaAPI {
  async sendSchema(data: string): Promise<void> {
    try {
      const response = await axios.post('https://webhook.site/d83091cd-ec35-4350-a3d1-f4dfd50a2aa4', data);
      if (response.status === 200) {
        console.log('Data sent successfully:', response.data);
      } else {
        console.error('Failed to send data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
}

export const schemaAPI = new SchemaAPIService();
