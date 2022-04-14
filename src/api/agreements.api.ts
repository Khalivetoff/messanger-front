import client from "@/api/client";

export const getAgreements = async (): Promise<string> => {
  return (await client.get('agreements'))?.data;
}
