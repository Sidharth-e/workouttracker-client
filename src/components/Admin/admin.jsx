import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Main = () => {
	// const [text,settext]=useState("")
	// const [text2,settext2]=useState()
	const [response,setresponse] = useState([]);
	const [lastreg,setlastreg] = useState([]);
	const [email,setemail] = useState([]);
	const clear = async (e) => {
		e.preventDefault();
			const data=null
			const url = "http://localhost:8080/api/remove";
			axios.post(url, data);

			window.location.reload();
	};
	useEffect(()=>{
		async function fetchdata(){
            const data ={"data":null}
			const url = "http://localhost:8080/api/admin";
			const { data: res } =await axios.post(url, data)
			setlastreg(res.data.slice(-1)[0].firstName+' '+res.data.slice(-1)[0].lastName);
			setemail(res.data.slice(-1)[0].email)
			setresponse(res.data)
	} setInterval(()=>fetchdata(),5000)
},[]);

	return (
		<div>
	<header>

		<div className={styles.logosec}>
			<div className={styles.logo}>Feedback</div>
		</div>

		<div className={styles.searchbar}>
			<input type="text"
				placeholder="Search"/>
			<div className={styles.searchbtn}>
			<img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
					className={styles.icn+' '+styles.srchicn}
					alt="search-icon"/>
			</div>
		</div>

		<div className={styles.message}>
			<div className={styles.circle}></div>
			<img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
				className={styles.icn}
				alt=""/>
			<div className={styles.dp}>
			<img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
					className={styles.dpicn}
					alt="dp"/>
			</div>
		</div>

	</header>

	<div className={styles.main_container}>
		<div className={styles.main}>

			<div className={styles.searchbar2}>
				<input type="text"
					name=""
					id=""
					placeholder="Search"/>
				<div className={styles.searchbtn}>
				<img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
						className={styles.icn+''+ styles.srchicn}
						alt="search-button"/>
				</div>
			</div>

			<div className={styles.box_container}>

				<div className={styles.box}>
					<div className={styles.text}>
						<h2 className={styles.topic_heading}>{response.length}</h2>
						<h2 className={styles.topic}>Feedback</h2>
					</div>

					<img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
						alt="Views"/>
				</div>

				<div className={styles.box}>
					<div className={styles.text}>
						<h2 className={styles.topic_heading}>{lastreg}</h2>
						<h2 className={styles.topic}>Last Feedback Submmission</h2>
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.text}>
						<h5 className={styles.topic_heading}>{email}</h5>
						<h2 className={styles.topic}>Last Feedback subitted Email-ID</h2>
					</div>
				</div>
			</div>

			<div className={styles.report_container}>
				<div className={styles.report_header}>
					<h1 className={styles.recent_Articles}>Feedback Details</h1>
					<button className={styles.clear} onClick={clear}>Clear</button>
				</div>
                <table className={styles.rwd_table}>
				<tbody>
         <tr>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Email ID</th>
		   <th>Date</th>
		   <th>Feedback</th>
         </tr>  
       
         {
         response.map( (items,key) =>
         <tr key={key}>
             <td data-th="Firstname">{items.firstName }</td>
             <td data-th="Lastname">{items.lastName }</td>
             <td data-th="Email">{items.email }</td>
			 <td data-th="Date">{Date(items.date) }</td>
			 <td data-th="Date">{Date(items.Feedback) }</td>
         </tr>
         )
       }
       </tbody>
                </table>
		    </div>
		</div>
	</div>

		</div>
		
	);
};

export default Main;
