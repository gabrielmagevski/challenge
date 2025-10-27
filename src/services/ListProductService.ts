export async function getListProductService(url: string): Promise<any> {
  const content = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  const req = await fetch(url, content);

  if (!req.ok) throw new Error("Bad Request");
  
  return req.json(); 
}
