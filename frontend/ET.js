let editFlag =false;
let edId=0;

let list=document.getElementById("list");


window.addEventListener("DOMContentLoaded",domLoaded);
async function domLoaded(e)
{   try{
     const res= await axios.get("http://localhost:3000/get-all-expense");
    
      
        for(let i=0; i<res.data.length;i++)
        {
            let dt= res.data[i];
            let str =`${dt.amount} ${dt.category} ${dt.description}`
            
           showData(str,dt.id);
        }
    
     }
     catch(err){
        console.log(err);
     }
}



list.addEventListener("click",removeItem);
list.addEventListener("click",editItem);

async function submitform(event){
    event.preventDefault();
    let obj= {
        amount:document.getElementById('amount').value,
        desc:document.getElementById('desc').value,
        category:document.getElementById('category').value,    
        };
   try{


    if(editFlag===false){
        const res= await axios.post("http://localhost:3000/add-expense",obj);
        console.log('success');
        let dt= res.data;
        const str =`${dt.amount} ${dt.category} ${dt.description}`;          
        showData(str,dt.id);
        location.reload();
    }

    else
    {
        const res= await axios.put("http://localhost:3000/update-expense/"+edId,obj)
        
        const res1 = await axios.get("http://localhost:3000/single-expense/"+edId);
        const dt= res1.data;
        const str =`${dt.amount} ${dt.category} ${dt.description}`          
        showData(str,dt.id);
        

        editFlag=false;
        edId=0;
        
    }
}
catch(err){console.log(err);}
}


async function removeItem(e)
    { try{
        if(e.target.classList.contains("delete"))
    {
        if(confirm("Do you want to delete the expense"))
        {
            let li=e.target.parentElement;
            let id = li.getAttribute("id");
        
            let res= await axios.delete("http://localhost:3000/delete/"+id);
            list.removeChild(li);    
        }

    }
}
catch(err){
    console.log(err);
}
    }

 

    async function editItem(e)
    { try{
        if(e.target.classList.contains("edit"))
        {   editFlag=true;
            let li=e.target.parentElement;
            edId = li.getAttribute("id");
        
            const res= await axios.get("http://localhost:3000/single-expense/"+edId);
           
                document.getElementById('amount').value=res.data.amount;
                document.getElementById('desc').value=res.data.description;
                document.getElementById('category').value=res.data.category;    
                
           
           
            list.removeChild(li);    
        }
    }
    catch(err){console.log(err);}
    }    



    function showData(str,id)
    {
        
        let li=document.createElement("li");
        li.setAttribute("id",id);
        li.appendChild(document.createTextNode(str));
        let btn=document.createElement("Delete");
        btn.className="delete";
        btn.setAttribute("type","button");
        btn.style.border= "thick solid #0000FF";
        btn.appendChild(document.createTextNode("Delete")); 
        li.appendChild(btn);
        list.appendChild(li);
        let edbtn=document.createElement("edit");
        edbtn.className="edit";
        edbtn.setAttribute("type","button");
        edbtn.appendChild(document.createTextNode("Edit")); 
        edbtn.style.border= "thick solid #0000FF";
        li.appendChild(edbtn);
        edbtn.style.margin="5px";
    }

