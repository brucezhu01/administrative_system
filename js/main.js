//Model
let students;

students = [{
name: "Bruce Zhu",
dateEnrolled: "2022-05-09",
studentNumber: "stu01"
}, {
name: "John Wang",
dateEnrolled: "2022-06-20",
studentNumber: "stu02"
}, {
name: "Kevin Zou",
dateEnrolled: "2022-06-01",
studentNumber: "stu03"
}];


function createNewStudent(name, dateEnrolled, studentNumber) {
students.push({
  name: name,
  dateEnrolled: dateEnrolled,
  studentNumber: studentNumber
})
}

function deleteStudent(studentNumberToDelete) {
students = students.filter(student => {
  if (studentNumberToDelete === student.studentNumber){
    return false;
  } else {
    return true;
  }
})
}

const editStudent = (studentForEdit) => {
return () => {
  const updatedName = $('#newEditName').val();
  const updatedDate = $('#newDate').val();
  console.log(updatedName.length);

  if (updatedName.length === 0||updatedDate.length === 0) {
  alert('Missing item. Please enter valid student info!');
  } else {
    students.forEach(function (student) {
    if (student.studentNumber === studentForEdit.studentNumber) {
      student.name = updatedName;
      student.dateEnrolled = updatedDate;
    }
  }) 
}
  render();
}}

  //Controller
$("#addBar").hide();
$('#addStudentButton').on("click", () => {
  $("#addBar").toggle();
});

$('#searchBar').hide();
$('#addSearchButton').on("click", () => {
  $("#searchBar").toggle(); 
});

$('#searchButton').on("click", () => {
  const searchContent = $('#searchText').val();
  searchResult = students.filter((student) => {
    if (student.name === searchContent) {
      return true
    } else {
      return false
    }
  }); 

  if (searchResult.length === 0) {
    alert("Name not found. Please follow the format: First Name + space + Last Name");
  } else {for (let i = 0; i < searchResult.length; i++) {
      let searchArray = Object.values(searchResult[i]);
      alert("One name found. The id of the student is" + " " + searchArray[2]);
      console.log(searchArray[2]);
      // let currentDiv = document.getElementById('div' + searchArray[2]);
      // currentDiv.style = "background-color: yellow";
      // currentDiv.id = "select";
      // currentDiv.onmouseover = function() {document.getElementById('select').style = "background-color: rgb(238, 238, 238)"};
      }}  
  })


function onCreate(event) {
  const newName = $('#newStudentName').val(); 
  const newDateEnrolled = $('#newStudentDate').val();
  const newStudentNumber = $('#newStudentId').val();
  
  let studentNumberArray = students.map(a => a.studentNumber);

  if (newName.length === 0||newStudentNumber.length === 0||newDateEnrolled.length === 0) {
    alert('Missing item. Please enter valid student info!');
  } else if (studentNumberArray.includes(newStudentNumber) === true) {
    alert('Similar student ID detected. Please enter valid student ID!');
  } else {
  createNewStudent(newName, newDateEnrolled, newStudentNumber);
  event.path[1].remove();

  render();
  }
}

const onDelete = student => {
  return () => {
    deleteStudent(student.studentNumber);
    render();
  }
}

const onEdit = (student) => {
  return () => {
    const element = document.getElementById("div" + student.studentNumber);
    element.innerHTML = " "
    element.style = "display: flex;"

    const textbox1 = document.createElement('input');
    textbox1.type = 'text';
    textbox1.placeholder = student.name;
    textbox1.id = "newEditName";
    element.append(textbox1);
    
    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.placeholder = student.dateEnrolled;
    datePicker.id="newDate";
    element.append(datePicker);

    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'Confirm';
    confirmButton.id = "confirmButton";
    confirmButton.onclick = editStudent(student);
    element.append(confirmButton);
  }
}

function onSearch() {
  const searchContent = $('#searchText').val();
  console.log(searchContent);
}

//View
function render() {
  document.getElementById('displaySection').innerHTML = '';

  students.forEach(student => {
    const element = document.createElement('div');
    element.id = "div" + student.studentNumber;
    element.className = "mainInfo";

    const spanName = document.createElement('span');
    spanName.innerHTML = student.name;
    spanName.className = "studentName";
    element.appendChild(spanName)

    const spanDateEnrolled = document.createElement('span');
    spanDateEnrolled.innerHTML = student.dateEnrolled;
    spanDateEnrolled.className = "studentDate";
    element.appendChild(spanDateEnrolled)

    const spanID = document.createElement('span');
    spanID.innerHTML = student.studentNumber;
    spanID.className = "studentID";
    element.appendChild(spanID);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = "editDeleteButtonsContainer";

    const editButton = document.createElement('button');
    editButton.innerText = "Edit";
    editButton.onclick = onEdit(student);
    editButton.className = "editDeleteButtons";
    buttonsDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.onclick = onDelete(student);
    deleteButton.className = "editDeleteButtons";
    buttonsDiv.appendChild(deleteButton);

    element.appendChild(buttonsDiv);
    
    
    $('#displaySection').append(element);

  });
};

render();
