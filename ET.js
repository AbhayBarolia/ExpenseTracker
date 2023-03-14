let list=document.getElementById("list");
let count=1000;
function submitform(event){
    event.preventDefault();
    let li=document.createElement("li");
    let str=count+"      "+document.getElementById('amount').value+"       "+document.getElementById('desc').value+"       "+document.getElementById('category').value+"      ";
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
   

    

let obj= {
    amount:document.getElementById('amount').value,
    desc:document.getElementById('desc').value,
    category:document.getElementById('category').value,    
};
let i=count;
let ls=JSON.stringify(obj);
localStorage.setItem(i,ls);
count++;
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
            let str1=str.toString().substring(0,4);
            localStorage.removeItem(Number(str1));
            list.removeChild(li);
        }

    }
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

