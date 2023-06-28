import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';


function SocialMedia(){
    return(
        <div class="lists">
       
               <li>
                 <a href="https://t.me/Luminaichat">
                   <FontAwesomeIcon icon={faTelegram} />
                   
                 </a>
               </li>
               <li>
                 <a href="https://twitter.com/luminaiai">
                   <FontAwesomeIcon icon={faTwitter} />
                 </a>
               </li>
               <li>
                 <a href="https://twitter.com/luminaiai">
                 <FontAwesomeIcon icon={faGlobe} />
                 </a>
               </li>
           
     </div>
    )
}

export default SocialMedia;