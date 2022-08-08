import connection from "../dbStrategy/postgres.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function getUserMe(req,res){
  const { user } = res.locals;
  try {
    const {rows: queryData } = await connection.query(`
    SELECT id, "shortUrl", url, "visitCount" FROM "shortUrls" WHERE "userId" = $1;
    `, [user.id]);
    
    let totalVisits = 0;
    queryData.map(e => {
      totalVisits = e.visitsCount + totalVisits
    });

    const userData = {
      id: user.id,
      name: user.name,
      visitsCount: totalVisits,
      shortUrls: queryData
    }

    return res.status(200).send(userData);
    
  } catch (error) {
    return res.send("Error when you're getting your own info").status(500);
  }
}