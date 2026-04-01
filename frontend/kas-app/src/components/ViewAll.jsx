
import React,{useEffect,useState} from "react";
import axios from "axios";
export default function(){
const[d,sd]=useState([]);
useEffect(()=>{const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'; axios.get(`${apiUrl}/student/all`).then(x=>sd(x.data));},[]);
return(<table>
<tr><th>Roll</th><th>Name</th><th>Overall</th><th>Performance</th></tr>
{d.map(x=>(<tr key={x.roll}>
<td>{x.roll}</td><td>{x.name}</td><td>{x.overall}</td><td>{x.performance}</td>
</tr>))}
</table>);}
