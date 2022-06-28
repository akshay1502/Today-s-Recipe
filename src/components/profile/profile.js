/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BiImageAdd } from 'react-icons/bi';
import './profile.scss';
import fetchURL from '../../helperFunctions/fetch';

export default function Profile() {
  return (<Outlet />);
}

function EditProfile({ user }) {
  const { firstName, lastName, email } = user;
  const [previewSource, setPreviewSource] = useState(user.profileImage);
  const [formValues, setFormValues] = useState({
    editFirstName: firstName,
    editLastName: lastName,
    editEmail: email,
  });
  const [formErrors, setFormErrors] = useState({
    editFirstName: '',
    editLastName: '',
    editEmail: '',
  });
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    switch (name) {
      case 'editFirstName': {
        const result = /^[a-zA-Z]+$/g.test(value);
        const errorMsg = result ? '' : 'First name should contain only alphabets.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      case 'editLastName': {
        const result = /^[a-zA-Z]+$/g.test(value);
        const errorMsg = result ? '' : 'Last name should contain only alphabets.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      case 'editEmail': {
        const result = /^\S+@\S+\.\S+$/.test(value);
        const errorMsg = result ? '' : 'Enter a valid email address.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      default:
        break;
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const {
      editFirstName, editLastName, editEmail,
    } = formValues;
    const valueRequiredError = {};
    if (!editFirstName.length) { valueRequiredError.firstName = 'First name is required'; }
    if (!editLastName.length) { valueRequiredError.lastName = 'Last name is required'; }
    if (!editEmail.length) { valueRequiredError.email = 'Email is required'; }
    if (formErrors.editFirstName === '' && formErrors.editLastName === '' && formErrors.editEmail === '') {
      const { result } = await fetchURL('users/self/update', 'PATCH', {
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
        profileImage: previewSource,
      });
      if (result.id) {
        setFormValues({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        window.location.href = `/profile/${user._id}`;
      }
    } else {
      setFormErrors({ ...formErrors, ...valueRequiredError });
    }
  };
  return (
    <form className="editProfile main" onSubmit={handleEditSubmit} method="POST">
      <div style={{ position: 'relative' }}>
        {
          previewSource
            ? <img src={previewSource} alt={user.firstName} className="profileImage" />
            : (
              <div className="userProfileImage" style={{ backgroundColor: `#${user.colorCode}` }}>
                {`${user.firstName[0]}`}
              </div>
            )
        }
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          name="image"
          onChange={handleProfileImage}
          style={{ display: 'none' }}
          id="inputImage"
        />
        <BiImageAdd size="2rem" className="addImage" onClick={() => document.getElementById('inputImage').click()} />
      </div>
      <div>
        <label htmlFor="editFirstName">First Name</label>
        <br />
        <input
          name="editFirstName"
          id="editFirstName"
          type="text"
          value={formValues.editFirstName}
          onChange={handleEditInputChange}
        />
        <small>{formErrors.editFirstName}</small>
      </div>
      <div>
        <label htmlFor="editLastName">Last Name</label>
        <br />
        <input
          name="editLastName"
          id="editLastName"
          type="text"
          value={formValues.editLastName}
          onChange={handleEditInputChange}
        />
        <small>{formErrors.editLastName}</small>
      </div>
      <div>
        <label htmlFor="editEmail">Email</label>
        <br />
        <input
          name="editEmail"
          id="editEmail"
          type="email"
          value={formValues.editEmail}
          onChange={handleEditInputChange}
        />
        <small>{formErrors.editEmail}</small>
      </div>
      <div>
        <input type="submit" value="Save" id="save" />
        <Link to={`/profile/${user._id}`} type="button" style={{ textDecoration: 'none' }} id="cancel">Cancel</Link>
      </div>
    </form>
  );
}
export { EditProfile };
