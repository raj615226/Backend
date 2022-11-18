export const createprofileService:any=async(Pool:any,datas:any,password:any)=>{
    const query=`INSERT INTO public.user_details(name,email,phonenumber,department,address,city,state,country,pincode) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;`
    const querydata:any[]=[datas.name,datas.email,datas.phone,datas.department,datas.address,datas.city,datas.state,datas.country,datas.pincode]
    return await Pool.query(query,querydata)  
}
export const verifyemailService:any=async(Pool:any,datas:any)=>{
    const query=`SELECT * FROM public.user_details WHERE email=$1 AND name=$2 AND department=$3;`
    const querydata:any[]=[datas.email,datas.name,datas.department]
    return await Pool.query(query,querydata)
}
// export const loginService:any=async(Pool:any,datas:any,token:any)=>{
//     const query=`UPDATE public.user_details SET token = $2 WHERE email= $1 RETURNING *;`
//     const querydata:any[]=[datas.email,token]
//     return await Pool.query(query,querydata)
// }
// export const logutService:any=async(Pool:any,datas:any)=>{
//     const query=`UPDATE public.user_details SET token = null WHERE email= ${datas} RETURNING *;`
//     return await Pool.query(query)
// }
export const getdataService:any=async(Pool:any,datas:any)=>{
    const query=`SELECT * FROM public.user_details;`
    const querydata:any[]=[datas.email,datas.name,datas.department]
    return await Pool.query(query,querydata)
}
