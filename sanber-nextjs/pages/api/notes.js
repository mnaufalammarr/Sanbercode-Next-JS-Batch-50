export default async function handler(req, res) {
    try{
      const Response = await (await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes")).json();
      res.status(200).json({...Response});
    } catch (error){}
    res.error
  }
  