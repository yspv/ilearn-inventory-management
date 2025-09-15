import jwt from "jsonwebtoken";
import axios, { AxiosInstance } from "axios";

interface SalesforceResponse {
  id: string;
  success: true;
  errors: unknown;
}

interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
}

export class SalesForce {
  private version = "v58.0";
  private client: AxiosInstance;

  constructor(instanceUrl: string, token: string) {
    this.client = axios.create({
      baseURL: `${instanceUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  static async get() {
    const token = this.generateToken();
    const params = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: token,
    });
    const res = await axios.post<SalesforceAuthResponse>(
      `${process.env.SF_LOGIN_URL}/services/oauth2/token`,
      params,
    );
    return new SalesForce(res.data.instance_url, res.data.access_token);
  }

  static generateToken() {
    return jwt.sign(
      {
        iss: process.env.SF_CLIENT_ID,
        sub: process.env.SF_USERNAME,
        aud: process.env.SF_LOGIN_URL,
        exp: Math.floor(Date.now() / 1000) + 3 * 60,
      },
      process.env.SF_PRIVATE_KEY!,
      { algorithm: "RS256" },
    );
  }

  private endpoint(path: string) {
    return `/services/data/${this.version}${path}`;
  }

  async createContact(input: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    const { data } = await this.client.post<SalesforceResponse>(
      this.endpoint("/sobjects/Contact"),
      {
        FirstName: input.firstName,
        LastName: input.lastName,
        Email: input.email,
      },
    );
    return data;
  }
}
