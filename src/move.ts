// Please update this type as same as with the data shape.
type List = Array<{ id: string; name: string; files: Array<File> }>;

type File = { id: string; name: string };

export default function move(list: List, source: string, destination: string): List {
  const listFile = list.map((listElement) => {
    // First of all, we find the file that we will move to the other folder
    if (listElement.id === source) throw new Error('You cannot move a folder');
    if (listElement.files) {
      return listElement.files.find((file: File) => file.id === source);
    }
    return listElement.files;
  });

  // we need to delete the file
  list.forEach((listElement) => {
    if (listElement.files) {
      let deletedFile = listElement.files;
      deletedFile = listElement.files.filter((file) => file.id !== source);
      // eslint-disable-next-line no-param-reassign
      listElement.files = deletedFile;
    }
  });

  const destinationIndex = list.findIndex((item) => item.id === destination);
  if (destinationIndex < 0) throw new Error('You cannot specify a file as the destination');

  // we add the file
  list.forEach((listElement) => {
    if (listElement.id === destination) {
      const newFiles = listElement.files;
      if (listFile[0]) {
        newFiles.push(listFile[0]);
      }
      return newFiles;
    }
    return list;
  });

  return list;
}
