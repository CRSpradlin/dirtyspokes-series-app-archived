import React from "react";

export default class RemoveUploadForm extends React.Component {

	state = {
		loading: false,
		racesLoading: true,
		raceNames: {},
		selectedRaceType: 'long',
		selectedRaceNames: ["Loading..."]
	};
	
	constructor(props) {
		super(props);
	};

	public handleFailure = (error) => {
		alert('Error Occured: ' + error.message);
		this.setState({ 
			loading: false,
			racesLoading: false
		 });
	}

	public setRaceNames = (raceNames) => {
		this.setState({
			raceNames,
			selectedRaceType: 'long',
			racesLoading: false,
			loading: false 
		});
		this.selectedRaceChanged({ target: { value: 'long' }});
	};

	public successfullyRemovedRace = (raceNames) => {
		this.setRaceNames(raceNames);
		alert("Successfully Removed Race");
	}

	public selectedRaceChanged = (event) => {
		this.setState({
			selectedRaceType: event.target.value,
			selectedRaceNames: this.state.raceNames[event.target.value]
		});
	};
	
	public componentDidMount = () => {
		// @ts-ignore
		google.script.run
			.withSuccessHandler(this.setRaceNames)
			.withFailureHandler(this.handleFailure)
			.getRaceNames();
	};

	public handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ 
			loading: true,
			racesLoading: true
		 });

		 // @ts-ignore
		 google.script.run
		 	.withSuccessHandler(this.successfullyRemovedRace)
			.withFailureHandler(this.handleFailure)
			.removeRaceHandler(document.getElementById("removeForm"));
	};

	public render() {
		return (
			<div className="content-center">
				<span className="text-sky-700 text-lg p-6">Select Race Type and Race Name to Remove</span>
				<form id="removeForm" onSubmit={this.handleSubmit}>
					<div className="m-3">
						<span className="text-sky-700">Race Type: </span>
						<select name="raceType" value={this.state.selectedRaceType} id="raceType" onChange={this.selectedRaceChanged}>
							<option key="0" value="long">Long Course</option>
							<option key="1" value="short">Short Course</option>
						</select>
					</div>
					<div className="m-3">
						<span className="text-sky-700">Race Name: </span>
						<select name="raceName" disabled={this.state.racesLoading}>
							{this.state.selectedRaceNames.map((option, index) => (
								<option key={index} value={option}>{option}</option>
							))}
						</select>
					</div>
					<div className="m-3">
						<input type="submit" value={this.state.loading?"Removing...":"Submit"} disabled={this.state.loading} className={`w-[10rem] ${this.state.racesLoading ? 'bg-sky-700' : ' bg-sky-500 hover:bg-sky-700'} px-5 py-2 text-sm rounded-full font-semibold text-white`}/>
					</div>
				</form>
			</div>
		);
	};
}