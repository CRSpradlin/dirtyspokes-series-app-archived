import React from "react";
import FileUploadForm from "./fileUploadForm";
import RemoveUploadForm from "./removeUploadForm";

export default class Root extends React.Component {

	state = {
		activeTabName: 'fileUploadForm',
		activeTabComponent: <FileUploadForm /> 
	}

	constructor(props) {
		super(props);
	}

	setActiveTab(tabName) {
		switch (tabName) {
			case 'fileUploadForm':
				this.setState({
					activeTabName: tabName,
					activeTabComponent: <FileUploadForm />
				});
				break;
			case 'removeUploadForm':
				this.setState({
					activeTabName: tabName,
					activeTabComponent: <RemoveUploadForm />
				});
				break;
			default:
				alert('Tab not found, please try again later');
		}
	}

	public render() {
		return (
			<div className="h-full">
				<div className="h-20 flex flex-row text-center justify-center">
					<ul className="flex border-b">
						<li className="-mb-px mr-1">
							<a className={`bg-white inline-block py-2 px-4 font-semibold ${this.state.activeTabName === 'fileUploadForm'?'border-l border-t border-r rounded-t text-blue-700':'text-gray-400 hover:text-blue-300'}`} href="#" onClick={() => this.setActiveTab('fileUploadForm')}>Upload</a>
						</li>
						<li className="mr-1">
							<a className={`bg-white inline-block py-2 px-4 font-semibold ${this.state.activeTabName === 'removeUploadForm'?'border-l border-t border-r rounded-t text-blue-700':'text-gray-400 hover:text-blue-300'}`} href="#" onClick={() => this.setActiveTab('removeUploadForm')}>Remove</a>
						</li>
						<li className="mr-1">
							<a className={`bg-white inline-block py-2 px-4 font-semibold ${this.state.activeTabName === 'dangerForm'?'border-l border-t border-r rounded-t text-blue-700':'text-gray-400 hover:text-blue-300'}`} href="#" onClick={() => this.setActiveTab('dangerForm')}>Tab</a>
						</li>
					</ul>
				</div>
				<div className="h-full m-10 flex flex-col text-center">
					{this.state.activeTabComponent}
				</div>
			</div>
		);
	}
}