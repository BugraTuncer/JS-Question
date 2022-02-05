// Please update this type as same as with the data shape.
type List = Array<{ id: string; name: string; files: Array<File> }>;

type File = { id: string; name: string };

export default function move(list: List, source: string, destination: string): List {
  const foundSourceListArray = list.map((listElement) => {
    if (listElement.id === source) throw new Error('You cannot move a folder');
    if (listElement.files) {
      return listElement.files.find((file: File) => file.id === source);
    }
    return listElement.files;
  });

  list.forEach((listElement) => {
    if (listElement.files) {
      let newListFiles = listElement.files;
      newListFiles = listElement.files.filter((file) => file.id !== source);
      // eslint-disable-next-line no-param-reassign
      listElement.files = newListFiles;
    }
  });
  const destinationIndex = list.findIndex((item) => item.id === destination);
  if (destinationIndex < 0) throw new Error('You cannot specify a file as the destination');
  list.forEach((listElement) => {
    if (listElement.id === destination) {
      const newFiles = listElement.files;
      if (foundSourceListArray[0]) {
        newFiles.push(foundSourceListArray[0]);
      }
      return newFiles;
    }
    return list;
  });

  return list;
}
