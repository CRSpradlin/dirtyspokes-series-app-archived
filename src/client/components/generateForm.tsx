import React from "react";

export default class GenerateForm extends React.Component {

	state = {
		loading: false,
        selectedRaceType: 'long'
	};
	
	constructor(props) {
		super(props);
	};

	public handleFailure = (error) => {
		alert('Error Occured: ' + error.message);
		this.setState({ 
			loading: false
		 });
	}

	public successfullyGeneratedReport = (data) => {

		// Create a link element
		const link = document.createElement("a");

		//const blob = new Blob(bytes, {type: "application/msexcel"});
    	//const url = window.URL.createObjectURL(blob);
	  
		// Set link's href to point to the Blob URL
		link.href = data;
		link.download = 'GeneratedReport.xlsx'
	  
		// Append link to the body
		document.getElementById('generateForm')?.appendChild(link);
	  
		// Dispatch click event on the link
		// This is necessary as link.click() does not work on the latest firefox
		link.dispatchEvent(
		  new MouseEvent('click', { 
			bubbles: true, 
			cancelable: true, 
			view: window 
		  })
		);
	  
		// Remove link from body
		document.getElementById('generateForm')?.removeChild(link);

		this.setState({ 
			loading: false
		 });
	}

	public handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ 
			loading: true
		 });

		 // @ts-ignore
		 google.script.run
		 	.withSuccessHandler(this.successfullyGeneratedReport)
			.withFailureHandler(this.handleFailure)
			.generateReport(document.getElementById('generateForm'));
	};

	public render() {
		return (
			<div className="content-center">
				<span className="text-sky-700 text-lg p-6">Select Race Type and Race Name to Remove</span>
				<form id="generateForm" onSubmit={this.handleSubmit}>
					<div className="m-3">
						<span className="text-sky-700">Race Type: </span>
						<select name="raceType" value={this.state.selectedRaceType} id="raceType" onChange={e => this.setState({ selectedRaceType: e.target.value })}>
							<option key="0" value="long">Long Course</option>
							<option key="1" value="short">Short Course</option>
						</select>
					</div>
                    <div className="m-3">
						<span className="text-sky-700">Allowed Absences: </span>
						<input name="allowedAbsences" type="number" min="0" max="10" />
					</div>
                    <div className="m-3">
						<span className="text-sky-700">Number per Series: </span>
						<input name="numberPerSeries" type="number" min="1" max="50" />
					</div>
					<div className="m-3">
						<input type="submit" value={this.state.loading?"Generating...":"Submit"} disabled={this.state.loading} className={`w-[10rem] ${this.state.loading ? 'bg-sky-700' : ' bg-sky-500 hover:bg-sky-700'} px-5 py-2 text-sm rounded-full font-semibold text-white`}/>
					</div>
				</form>
			</div>
		);
	};
}