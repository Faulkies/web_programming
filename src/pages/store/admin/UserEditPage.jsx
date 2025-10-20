// src/admin/pages/UserEditPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Stack, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";


export default function UserEditPage({ mode }){
//   const { userName } = useParams();
//   const nav = useNavigate();
//   const [model, setModel] = useState({ UserName:"", Name:"", Email:"", isAdmin:false, Password:"" });

//   useEffect(()=>{
//     if(mode==="edit") api.get(`/admin/users`).then(r=>{
//       const u = r.data.find(x=>x.UserName===userName); if(u) setModel({ ...u, Password:"" });
//     });
//   },[userName, mode]);

//   const save = async ()=>{
//     if(mode==="edit") await api.put(`/admin/users/${userName}`, model);
//     else await api.post(`/admin/users`, model);
//     nav("/admin/users");
//   };

  return (
    <Paper sx={{ p:2 }}>
      <Stack spacing={2}>
        <TextField label="UserName" disabled={mode==="edit"} value={model.UserName} onChange={e=>setModel({...model, UserName:e.target.value})}/>
        <TextField label="Name" value={model.Name} onChange={e=>setModel({...model, Name:e.target.value})}/>
        <TextField label="Email" value={model.Email} onChange={e=>setModel({...model, Email:e.target.value})}/>
        <TextField label="Password" type="password" value={model.Password} onChange={e=>setModel({...model, Password:e.target.value})}/>
        <FormControlLabel control={<Checkbox checked={!!model.isAdmin} onChange={e=>setModel({...model, isAdmin:e.target.checked})}/>} label="Admin" />
        <Button variant="contained" onClick={save}>Save</Button>
      </Stack>
    </Paper>
  );
}
