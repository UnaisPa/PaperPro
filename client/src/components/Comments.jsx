import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TbMessage } from "react-icons/tb";

export default function Comments() {
  return (
    <div>
      <Accordion className='bg-opacity-0 shadow-none ' sx={{background:'transparent',boxShadow:'none',padding:0,}}>
        <AccordionSummary
          
          aria-controls=""
          id="panel1-header"
        >
            <div className="flex ml-4 text-slate-300 hover:text-slate-100 cursor-pointer">
                            <TbMessage size={18} />
                            <p className="text-xs mx-1">23</p>
                        </div>
          <div sx={{padding:0}} ></div>
        </AccordionSummary>
        <AccordionDetails className='' >
            <input placeholder='Your comment' className='p-2.5 text-slate-100 w-11/12 sm:w-full rounded-md bg-slate-600 outline-none bg-opacity-45' />
            <p className='text-slate-400 mb-2 mt-4 opacity-70' >23 Comments</p>
          {/* <Typography style={{ fontFamily: '"Poppins", sans-serif',fontSize:'14px'}} className='text-slate-300' >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
          <div className='flex text-slate-300' >
            <div className=" bg-primary w-7 h-7 rounded-full text-center text-black pt-1.5 font-semibold">N</div>
            <p className='font-semibold mt-1 mx-2 text-sm' >Unais Muhmed</p>
            <p className='text-[0.60rem] opacity-70 mt-1.5' >2 hours ago</p>
          </div>
          <div className='mt-1' >
            <p className='text-slate-300 text-sm ml-9' >This is my comment! The comment is not original , It's just redered statically from frontend to check the design!</p>
            <p className='text-slate-300 text-[0.70rem] mt-2 opacity-60 ml-9'>Reply</p>
          </div>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}