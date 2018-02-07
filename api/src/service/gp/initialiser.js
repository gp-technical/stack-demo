import gpapi from 'stack-pack-gpapi'

// Folder: Responsive Toolkit for Leaders_dev1_auto/Leadership & Strategy
const folderId = '46c2f86d-0655-009b-86cc-a3bf00ac087a'

const initialiser = async () => {
  return await gpapi.get(`location/parent-folder/${folderId}/child-folders`)
}

export default initialiser
