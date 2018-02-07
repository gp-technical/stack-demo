import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { actionHub, services, components } from '../../loader'

class component extends React.PureComponent {
  state = {
    selectedFolderId: null
  }
  getMenuItems = list => {
    if (list) {
      return list.map(i => <MenuItem value={i.Id} key={i.Id} primaryText={i.Name} />)
    }
    return <MenuItem value={null} primaryText="" />
  }

  onFolderSelected = (e, i, folderId) => {
    this.setState({ selectedFolderId: folderId })
    this.props.getDocuments(folderId)
  }

  onFileSelected = (file, row) => {
    const message = `In a real system, the file '${file.name}' would have been uploaded to the document '${row.name}'`
    window.alert(message)
  }

  columns = {
    name: 'name',
    type: 'content type',
    created: {
      format: ({ created }) => created.replace(' 00:00:00', '')
    },
    upload: {
      label: 'custom action',
      custom: row => <components.FileUpload label="select" row={row} onFileSelected={this.onFileSelected} />
    }
  }

  render () {
    const { folders, documents } = this.props
    const { selectedFolderId } = this.state
    return (
      <components.Box>
        <h2>
          Feature: <i>gp</i>
        </h2>
        <h3>Retrieve Content via the GP-API</h3>
        <p>Shows how to retrieve a list of folders and the content of the currently selcted folder via the main GP-API.</p>
        <p>For security reasons the GP-API cannot be called directly this local application. Instead the calls must be made on the server-side and the stack makes this easy and secure by default.</p>
        <h3>Reuse the shared Table component</h3>
        <p>This component also shows how to use a shared stack Table component. This is a modified version of the material-ui Table that adds some addiotnal features such as:</p>
        <ul>
          <li>A simple, plain object definition for the row structure</li>
          <li>Custom controls in the table cells. In the example below you can see the reuse of FileUpload shared component. You can safely test this, no files are actually uploaded.</li>
          <li>Custom cell value formatting. In the example below the created date is formatted</li>
        </ul>
        <Divider />
        <SelectField floatingLabelText="Select a Folder" value={selectedFolderId} onChange={this.onFolderSelected}>
          {this.getMenuItems(folders)}
        </SelectField>

        <components.Table rows={documents} columns={this.columns} />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  folders: services.gp.selector.getFolders(state),
  documents: services.gp.selector.getDocuments(state)
})

const mapDispatchToProps = dispatch => ({
  getDocuments: folderId => dispatch(actionHub.GP_GET_DOCUMENTS(folderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
