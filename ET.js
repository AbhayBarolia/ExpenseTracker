let editFlag =false;
let edUrl="";
let list=document.getElementById("list");
function submitform(event){
   
    event.preventDefault();
    let obj= {
    amount:document.getElementById('amount').value,
    desc:document.getElementById('desc').value,
    category:document.getElementById('category').value,    
    };
    if(editFlag===false){
    axios.post("https://crudcrud.com/api/a67dbf06587f4775bda035004815effe/ExpenseTracker",obj).then((res)=>{console.log(res);
    let dt= res.data;
    const str =`${dt.amount} ${dt.category} ${dt.desc} ${dt._id}`          
    showData(str);
    }).catch((err)=>{console.log(err);});

    }
    else
    {
        axios.patch("https://crudcrud.com/api/a67dbf06587f4775bda035004815effe/ExpenseTracker/"+edUrl,obj)
        .then((res)=>{console.log(res);})
        .catch((err)=>{console.log(err);});
        
        axios.get("https://crudcrud.com/api/a67dbf06587f4775bda035004815effe/ExpenseTracker"+edUrl).then((res)=>{console.log(res);
        let dt= res.data;
        const str =`${dt.amount} ${dt.category} ${dt.desc} ${dt._id}`          
        showData(str);
        }).catch((err)=>{console.log(err);});

        editFlag=false;
        edUrl="";
    }
}
list.addEventListener("click",removeItem);
list.addEventListener("click",editItem);

function removeItem(e)
    {
        if(e.target.classList.contains("delete"))
    {
        if(confirm("Do you want to delete the expense"))
        {
            let li=e.target.parentElement;
            let str=li.textContent;
            let str1=str.slice(-34);
            let str2=str1.substring(0,24);
            
            list.removeChild(li);
            axios.delete("https://crudcrud.com/api/a67dbf06587f4775bda035004815effe/ExpenseTracker/"+str2).then((res)=>{console.log(res);}).catch((err)=>{console.log(err);});
            
        }

    }
    }

    window.addEventListener("DOMContentLoaded",domLoaded);
    function domLoaded(e)
    {
        axios.get("https://crudcrud.com/api/a67dbf06587f4775bda035004815effe/ExpenseTracker").then((res)=>{
           
          
            for(let i=0; i<res.data.length;i++)
            {
                let dt= res.data[i];
                const str =`${dt.amount} ${dt.category} ${dt.desc} ${dt._id}`
                
               showData(str);
            }
        
          
    })
    .catch((err)=>{console.log(err);});
        
    }

    function editItem(e)
    {
        if(e.target.classList.contains("edit"))
        {   editFlag=true;
            let li=e.target.parentElement;
            let str=li.textContent;
            let str1=str.slice(-34);
            let str2=str1.substring(0,24);
            

            axios.get("https://crudcrud.com/api/a67dbf06587f4775bda035004815effe/ExpenseTracker/"+str2)
            .then((res)=>{
                document.getElementById('amount').value=res.data.amount;
                document.getElementById('desc').value=res.data.desc;
                document.getElementById('category').value=res.data.category;    
               
            })
            .catch((err)=>{console.log(err);});
           
            list.removeChild(li);
            edUrl=str2;    
        }
    }    

    function showData(str)
    {
        
        let li=document.createElement("li");
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

