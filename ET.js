let list=document.getElementById("list");
let count=1000;
function submitform(event){
    event.preventDefault();
    let obj= {
    amount:document.getElementById('amount').value,
    desc:document.getElementById('desc').value,
    category:document.getElementById('category').value,    
    };

    axios.post("https://crudcrud.com/api/a67dbf06587f4775bda035004815effe/ExpenseTracker",obj).then((res)=>{console.log(res);
    let dt= res.data;
    const str =`${dt.amount} ${dt.category} ${dt.desc} ${dt._id}`          
    showData(str);
    }).catch((err)=>{console.log(err);});

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
        {    let li=e.target.parentElement;
            let str=li.textContent;
            let str1=str.toString().substring(0,4);
            let obj= JSON.parse(localStorage.getItem(str1));
            localStorage.removeItem(Number(str1));
            list.removeChild(li);
            document.getElementById('amount').value=obj.amount;
            document.getElementById('desc').value=obj.desc;
            document.getElementById('category').value=obj.category;
            
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

