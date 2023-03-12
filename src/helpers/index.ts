import { ErrorsType } from 'react-images-uploading';

const getReadableError = (maxUploadCount: number, errors: ErrorsType | null) => {
  let error = '';
  if (errors?.maxNumber) {
    error = `Only ${maxUploadCount} image(s) supported.`;
  } else if (errors?.maxFileSize) {
    error = `Maximum file size exceed.`;
  } else if (errors?.resolution) {
    error = 'Maximum file resolution exceed.';
  } else if (errors?.acceptType) {
    error = 'Image not supported.';
  }
  return error;
};

const AppHelpers = { getReadableError };

export default AppHelpers;
