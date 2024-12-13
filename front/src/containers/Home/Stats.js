import React from 'react'
import mensOnline from '../../assets/men_online.png'
import womensOnline from '../../assets/women_online.png'
import membersOnline from '../../assets/members_online.png'
import totalMembers from '../../assets/total_members.png'
function Stats() {
  return (
    <div style={{width:'100%', height:'100px', backgroundColor:'#303231', display:'flex', alignitems:'center', justifyContent:'space-evenly', color:'white'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'20px'}}>

            <img src={totalMembers} height={38} width={38} /> 
            <div  style={{textAlign:'center'}}>
                <h5>1,875+
                </h5>
                <p>Members in Total
                </p>


            </div>
               
        </div>
        <div  style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'20px'}}>
        <img src={membersOnline} height={38} width={38} /> 
            <div  style={{textAlign:'center'}}>
                <h5>1,842+
                </h5>
                <p>Members Online

                </p>

            </div>
        </div>
        <div  style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'20px'}}>
        <img src={mensOnline} height={38} width={38} /> 
            <div  style={{textAlign:'center'}}>
                <h5>950+
                </h5>
                <p>Men Online

                </p>

            </div>
        </div>
        <div  style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'20px'}}>
        <img src={womensOnline} height={38} width={38}  /> 
            <div style={{textAlign:'center'}}>
                <h5>871+

                </h5>
                <p>Women Online

                </p>


            </div>

        </div>
   
    </div>
  )
}

export default Stats
