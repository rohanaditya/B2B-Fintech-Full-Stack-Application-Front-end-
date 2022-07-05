import * as React from 'react';
import { getData } from "../services/data";
import { useEffect, useState } from 'react';
import TableWithData from './TableWithData';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import ABC from './abcLogo.svg';
import High from './logo.jpg';
import './Landing.css';

const searchData = async (sample) => {
    let url = "cust_number=" + sample;
    let response = await axios.get("http://localhost:8080/HRC82166W_Rohan/search?" + url);
    let data = response.data.Bills;
    data.map((Bills, index) => ({ ...Bills, "id": index }))
    return data;
}

const getadvsearch = async (cust, business, doc, inv) => {
    console.log('inside')
    let url = "cust_number=" + cust + "&business_year=" + business + "&doc_id=" + doc + "&invoice_id=" + inv;
    let response = await axios.get("http://localhost:8080/HRC82166W_Rohan/advsearch?" + url);
    let data = response.data.Bills;
    return data;
}

const edit = async (a, inc, cpt) => {
    let url = "id=" + a + "&invoice_currency=" + inc + "&cust_payment_terms=" + cpt;
    let response = await axios.get("http://localhost:8080/HRC82166W_Rohan/update?" + url);
    return response;
}


const deleteFromDB = async (a) => {
    let url = "id=" + a;
    let response = await axios.get("http://localhost:8080/HRC82166W_Rohan/delete?" + url);
    return response.data;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const addRecordToDB = async (b_code, c_num, clear_date, b_year, doc_id, p_date, c_date, d_date, inv_cu, doc_type, post_id, total_open, base_date, cust_term, inv_id) => {
    let url = "business_code=" + b_code + "&clear_date=" + clear_date + "&posting_date=" + p_date + "&document_create_date=" + c_date + "&due_in_date=" + d_date + "&invoice_currency=" + inv_cu + "&document_type=" + doc_type + "&posting_id=" + post_id + "&total_open_amount=" + total_open + "&baseline_create_date=" + base_date + "&cust_payment_terms=" + cust_term + "&cust_number=" + c_num + "&buisness_year=" + b_year + "&doc_id=" + doc_id + "&invoice_id=" + inv_id;
    console.log("http://localhost:8080/HRC82166W_Rohan/insert?" + url)
    let response = await axios.get("http://localhost:8080/HRC82166W_Rohan/insert?" + url);
    return response.data;
}

export default function Landing() {

    const [data, setData] = useState([]);
    useEffect(async () => { setData(await getData()) }, []);
    const [isOpen, setIsOpen] = useState(false);

    async function getChecked() {
        const checkBox = document.getElementById('c_input').value;
        if (checkBox.length > 0) {
            setData(await searchData(checkBox))
        }
    }


    async function advsearch() {
        const cust = document.getElementById('cust').value;
        const business = document.getElementById('business').value;
        const doc = document.getElementById('doc').value;
        const inv = document.getElementById('inv').value;
        if (cust.length > 0 && business.length > 0 && doc.length > 0 && inv.length > 0) {
            setData(await getadvsearch(cust, business, doc, inv))
            document.querySelector('.bg-modal-adv').style.display = 'none';
        }
    }

    async function Refresh() {
        setData(await getData());
        document.getElementById('c_input').value = "";
    }

    async function AddPopup(){
        document.querySelector('.bg-modal').style.display = 'flex';
    }
    async function closePopup(){
        document.querySelector('.bg-modal').style.display = 'none';
    }

    async function EditPopup(){
        document.querySelector('.bg-modal-edit').style.display = 'flex';
    }
    async function closeEditPopup(){
        document.querySelector('.bg-modal-edit').style.display = 'none';
    }

    async function DeletePopup(){
        document.querySelector('.bg-modal-delete').style.display = 'flex';
    }
    async function closeDeletePopup(){
        document.querySelector('.bg-modal-delete').style.display = 'none';
    }

    async function AdvPopup(){
        document.querySelector('.bg-modal-adv').style.display = 'flex';
    }
    async function closeAdvPopup(){
        document.querySelector('.bg-modal-adv').style.display = 'none';
    }


    async function editRecord() {
        let a = document.getElementById('checkBoxForRecord').value;
        let inc = document.getElementById('inc').value;
        let cpt = document.getElementById('cpt').value;
        if (a.length > 0 && inc.length && cpt.length > 0) {
            let res = await edit(a, inc, cpt)
            console.log(res.data);
            if (res.data == 'updated') {
                alert('Updated Successfully!')
                document.querySelector('.bg-modal-edit').style.display = 'none';
            }
            else {
                alert('Error');
            }
        }
    }
    async function del() {
        let a = document.getElementById('checkBoxForRecord').value;
        let res = await deleteFromDB(a);
        console.log(res);
        if (res == 'Deleted') {
            alert('Deleted Successfully!')
            document.querySelector('.bg-modal-delete').style.display = 'none';
        }
        else {
            alert('Error');
        }
    }


    async function addRecord() {
        let b_code = document.getElementById('b_code').value;
        let c_num = document.getElementById('c_num').value;
        let clear_date = document.getElementById('clear_date').value;
        let b_year = document.getElementById('b_year').value;
        let doc_id = document.getElementById('doc_id').value;
        let p_date = document.getElementById('p_date').value;
        let c_date = document.getElementById('c_date').value;
        let d_date = document.getElementById('d_date').value;
        let inv_cu = document.getElementById('inv_cu').value;
        let doc_type = document.getElementById('doc_type').value;
        let post_id = document.getElementById('post_id').value;
        let total_open = document.getElementById('total_open').value;
        let base_date = document.getElementById('base_date').value;
        let cust_term = document.getElementById('cust_term').value;
        let inv_id = document.getElementById('inv_id').value;
        clear_date = formatDate(clear_date);
        p_date = formatDate(p_date);
        c_date = formatDate(c_date);
        d_date = formatDate(d_date);
        base_date = formatDate(base_date);
        let res = await addRecordToDB(b_code, c_num, clear_date, b_year, doc_id, p_date, c_date, d_date, inv_cu, doc_type, post_id, total_open, base_date, cust_term, inv_id);
        if (res == 'Inserted') {
            alert('Inserted Successfully!');
            document.querySelector('.bg-modal').style.display = 'none';
        }
        else {
            alert('Error');
        }
    }


    return (
        <div>
            
            <p style={{ paddingLeft: 10}} align="left">Invoice List</p>
            <Stack spacing={2} direction="row">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button style={{ minWidth: '150px', maxWidth: '150px', maxHeight: '40px', minHeight: '40px' }} onClick={()=>{alert('Predict Functionality not Added!')}}>PREDICT</Button>
                    <Button style={{ minWidth: '150px', maxWidth: '150px', maxHeight: '40px', minHeight: '40px' }} onClick={()=>{let windowFeatures = "left=100,top=100,width=900,height=600";window.open("", "Analytics", windowFeatures);}} >ANALYTICS VIEW</Button>
                    <Button style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} onClick={AdvPopup}>ADVANCE SEARCH</Button>
                </ButtonGroup>
                <Button style={{ maxHeight: '40px', minHeight: '40px' }} variant="outlined" onClick={Refresh}><RefreshIcon></RefreshIcon></Button>
                <TextField type="text" id="c_input" variant="outlined" placeholder='Enter Customer Number' onChange={getChecked} />
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                <ButtonGroup variant="outlined" aria-label="outlined button group"><Button onClick={AddPopup} style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px' }}>Add</Button></ButtonGroup>
                <ButtonGroup variant="outlined" aria-label="outlined button group"><Button onClick={EditPopup} id="editButton" style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px', cursor: "not-allowed" }}>EDIT</Button></ButtonGroup>
                <ButtonGroup variant="outlined" aria-label="outlined button group"><Button onClick={DeletePopup} id="deleteButton" style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px', cursor: "not-allowed" }}>DELETE</Button></ButtonGroup>
                </ButtonGroup> 
            </Stack>
            <div class="bg-modal">
                <div class="modal-content">
                    <p style={{ paddingLeft: 20, paddingLeft: 15 }} align="left">Add</p>
                    <Stack style={{ paddingLeft: 5 }} spacing={2} direction="row">
                    <TextField id="b_code" type="text" label="Business code" variant="outlined" width="100%"/>
                    <TextField id="c_num" type="text" label="Customer Number" variant="outlined" />
                    <TextField id="clear_date" type="date" label="Clear Date" variant="outlined" />
                    <TextField id="b_year" type="text" label="Business year" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25, paddingLeft: 5 }} spacing={2} direction="row">
                    <TextField id="doc_id" type="text" label="Doc Id" variant="outlined" />
                    <TextField id="p_date" type="date" label="Posting date" variant="outlined" />
                    <TextField id="c_date" type="date" label="Document Create Date" variant="outlined" />
                    <TextField id="d_date" type="date" label="Due in Date" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25, paddingLeft: 5 }} spacing={2} direction="row">
                    <TextField id="inv_cu" type="text" label="Invoice Currency" variant="outlined" />
                    <TextField id="doc_type" type="text" label="Document Type" variant="outlined" />
                    <TextField id="post_id" type="text" label="Posting id" variant="outlined" />
                    <TextField id="total_open" type="text" label="Total Open Amount" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25, paddingLeft: 5 }} spacing={2} direction="row">
                    <TextField id="base_date" type="date" label="Baseline Create Date" variant="outlined" />
                    <TextField id="cust_term" type="text" label="Customer Payment Terms" variant="outlined" />
                    <TextField id="inv_id" type="text" label="Invoice Id" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                    <Button onClick={addRecord} variant="outlined" style={{maxWidth: "390px",maxHeight: "50px",minWidth: "390px",minHeight: "30px"}} >ADD</Button>
                    <Button onClick={closePopup} variant="outlined" style={{maxWidth: "390px",maxHeight: "50px",minWidth: "390px",minHeight: "30px"}} >CANCEL</Button>
                    </Stack>
                </div>
            </div>
            <div class="bg-modal-edit">
                <div class="modal-content-edit">
                <p style={{ paddingLeft: 20 }} align="left">Edit</p>
                    <Stack style={{ paddingLeft: 5 }} spacing={1} direction="row">
                    <TextField id="inc" type="text" label="Invoice Currency" variant="outlined" />
                    <TextField id="cpt" type="text" label="Customer payment terms" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={1} direction="row">
                    <Button onClick={editRecord} variant="outlined" style={{maxWidth: "225px",maxHeight: "50px",minWidth: "225px",minHeight: "30px"}}>UPDATE</Button>
                    <Button classname="close-btn" onClick={closeEditPopup} variant="outlined" style={{maxWidth: "225px",maxHeight: "50px",minWidth: "225px",minHeight: "30px"}}>CANCEL</Button>
                    </Stack>
                </div>
            </div>
            <div class="bg-modal-delete">
                <div class="modal-content-delete">
                <p style={{ paddingLeft: 20 }} align="left">Delete Records ?</p>
                    <p>Are you sure you want to delete these record[s] ?</p>
                    <Stack style={{ paddingTop: 25 }} spacing={1} direction="row">
                    <Button classname="close-btn" onClick={closeDeletePopup} variant="outlined" style={{maxWidth: "245px",maxHeight: "50px",minWidth: "245px",minHeight: "30px"}}>CANCEL</Button>
                    <Button onClick={del} variant="outlined" style={{maxWidth: "245px",maxHeight: "50px",minWidth: "245px",minHeight: "30px"}}>DELETE</Button>
                    </Stack>
                </div>
            </div>
            <div class="bg-modal-adv">
                <div class="modal-content-adv">
                <p style={{ paddingLeft: 20 }} align="left">Advance Search</p>
                    <Stack style={{ paddingTop: 25, paddingLeft: 5 }} spacing={2} direction="row">
                    <TextField id="doc" type="text" label="Document id" variant="outlined" />
                    <TextField id="inv" type="text" label="Invoice id" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25, paddingLeft: 5 }} spacing={2} direction="row">
                    <TextField id="cust" type="text" label="Customer number" variant="outlined" />
                    <TextField id="business" type="text" label="Business year" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25, paddingLeft: 5 }} spacing={2} direction="row">
                    <Button onClick={advsearch} variant="outlined" style={{maxWidth: "225px",maxHeight: "50px",minWidth: "225px",minHeight: "30px"}}>SEARCH</Button>
                    <Button classname="close-btn" onClick={closeAdvPopup} variant="outlined" style={{maxWidth: "225px",maxHeight: "50px",minWidth: "225px",minHeight: "30px"}}>CANCEL</Button>
                    </Stack>
                </div>
            </div>
            <TableWithData id="landingGrid" data={data} />
            
        </div >

    );
}
