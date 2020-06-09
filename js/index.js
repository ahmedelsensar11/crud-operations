var searchInp =document.getElementById("productSearchInp");
var productName =document.getElementById("productNameInp");
var productPrice =document.getElementById("productPriceInp");
var productCompany =document.getElementById("productCompanyInp");
var productDesc =document.getElementById("productDescInp");

var currentIndex=0;

var alertContainer=document.getElementById("alertContainer");
alertContainer.style.display="none";



if (localStorage.getItem("itemContainer") ==null)
    {
        
        var productContainer=[];
    }
else
    {
        productContainer= JSON.parse(localStorage.getItem("itemContainer"));
        
        display();
    }




var addButton = document.getElementById("addBtn");
addButton.onclick= function ()
{
    if (addButton.innerHTML=="Add Product")
        {
            if (isValid()==true)
                {
                    addProduct();
                    display();
                    clearForm();            
                }
            
        }
    else
        {
            updateProduct()
            
        }
    
    
};


searchInp.onkeyup= function()
{
    searchProduct(searchInp.value);
}


function searchProduct(keyWord)
{
    var searchCols="";
    for(var i=0 ;i < productContainer.length ;i++)
        {
            if(productContainer[i].name.includes(keyWord))
                {
                    searchCols +='<div class="col-md-3 p-1"><div class=" mb-2 text-center product"><h3 class="mt-1" style="color: firebrick">'+productContainer[i].name+'</h3><p class="text-muted" style="color: black">'+productContainer[i].desc+'</p><p class="text-danger">'+productContainer[i].price+'</p><p class="text-info">'+productContainer[i].company+'</p><button class=" btn btn-outline-danger"  onclick="deleteProduct('+i+')">Delete</button></p><button class="mb-2 btn btn-outline-info"  onclick="updateProduct('+i+')">Update</button></div></div>'
                }
        }
    document.getElementById("searchRow").innerHTML=searchCols;

}


function isValid()
{
    var nameRegex= /^[A-Z][A-Z a-z+0-9]{1,10}$/;
    var PriceRegex= /^[1-9][0-9]{1,10}$/;
    var errors ="";
    
    if (nameRegex.test(productName.value)==false)
        {
            errors +="<p>Name Is Not Valid</p>";
            
        }
    
    if (PriceRegex.test(productPrice.value)==false)
        {
            errors +="<p>Price Is Not Valid</p>";
        }
    
    if (errors.length > 0)
        {
            alertContainer.style.display="block";
            alertContainer.innerHTML=errors;
            return false;
        }
    else
        {
            alertContainer.style.display="none";
            return true;
        }
   
    
}


function addProduct()
{
    var product = 
        {
            name:productName.value,
            price:productPrice.value,
            company:productCompany.value,
            desc:productDesc.value,
        }
    
    productContainer.push(product);
    
 localStorage.setItem("itemContainer", JSON.stringify(productContainer));
    
};

function display()
{
    var item="";
    for (var i=0 ;i<productContainer.length ;i++)
        {
            item +=`<div class="col-md-3 p-1">
            <div class=" mb-2 text-center product">
                <h3 class="mt-1" style="color: firebrick">`+productContainer[i].name+`</h3>
                <p class="text-muted" style="color: black">`+productContainer[i].desc+`</p>
                <p class="text-danger">`+productContainer[i].price+`</p>
                <p class="text-info">`+productContainer[i].company+`</p>
                <button class=" btn btn-outline-danger"  onclick="deleteProduct(`+i+`)">Delete</button></p>
                <button class="mb-2 btn btn-outline-info"  onclick="setupForm(`+i+`)">Update</button>
                </div>
                </div>`
        };
    document.getElementById("dataRow").innerHTML=item;
};

function clearForm()
{
    
    var inputs = document.getElementsByClassName("form-control");
    for (var i=0 ;i<inputs.length ;i++)
        {
            inputs[i].value="";
        }
};

function deleteProduct(id)
{
    if (addButton.innerHTML=="Add Product")
    {
        productContainer.splice(id ,1);
    
        localStorage.setItem
         ("itemContainer", JSON.stringify(productContainer));
        clearForm();
        display();
    }
    
};



function setupForm(id)
{
    productName.value=productContainer[id].name;
    productPrice.value=productContainer[id].price;
    productCompany.value=productContainer[id].company;
    productDesc.value=productContainer[id].desc;
    
    addButton.innerHTML="Update Product";
    
    currentIndex=id;
    
    
    
}


function updateProduct()
{

    if (isValid()==true)
        {
            productContainer[currentIndex].name=productName.value;
            productContainer[currentIndex].price=productPrice.value;
            productContainer[currentIndex].company=productCompany.value;
            productContainer[currentIndex].desc=productDesc.value;
            
            localStorage.setItem
            ("itemContainer", JSON.stringify(productContainer));
            display();
            clearForm();
            
            addButton.innerHTML="Add Product";

        }

};



