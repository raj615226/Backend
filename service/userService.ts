export const createprofileService:any=async(Pool:any,datas:any)=>{
    const query=`INSERT INTO public.user_details(name,email,phone_number,gender,address,fathername,platform,mothername) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`
    const querydata:any[]=[datas.name,datas.email,datas.phonenumber,datas.gender,datas.address,datas.fathername,datas.platform,datas.mothername]
    return await Pool.query(query,querydata)  
}
export const verifyemailService:any=async(Pool:any,datas:any)=>{
    const query=`SELECT * FROM public.user_details WHERE email=$1;`
    const querydata:any[]=[datas.email]
    return await Pool.query(query,querydata)
}