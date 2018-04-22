import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_ROOT } from '../../constants/api'

class Upload extends Component {
	constructor(props) {
		super(props)

		this.uploadFile = this.uploadFile.bind(this)
		this.state = {
			file: null,
			error: null,
			isLoading: false,
		}
	}

	uploadFile(e) {
		e.preventDefault()
		const data = new FormData()
		data.append('file', this.input.files[0])
		this.setState({
			isLoading: true,
		})

		axios
			.post(`${API_ROOT}/upload`, data)
			.then(response => {
				this.setState({ file: response.data.result, isLoading: false })
				this.input.value = ''
			})
			.catch(error => {
				this.setState({
					error: error.error.message || 'An error has occured.',
					isLoading: false,
				})
			})
	}

	render() {
		const { error, file, isLoading } = this.state
		return (
			<Fragment>
				<h2>Upload a File</h2>
				{file && (
					<div>
						<p>
							Your file is uploaded. {' '}
							<Link to={`/file/${file.public_id}`}>Download file</Link>
						</p>
					</div>
				)}
				<form onSubmit={this.uploadFile}>
					<input type="file" ref={input => (this.input = input)} />
					<button type="submit" disabled={isLoading}>
						Upload
					</button>
					{error && <div>{error}</div>}
				</form>
			</Fragment>
		)
	}
}

export default Upload
