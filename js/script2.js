/* 2.3.1. Створити об’єкт «Користувач» з властивостями «Прізвище»,
«Ім’я». */

function UserObj(surname, name) {
    this.surname = surname;
    this.name = name;
};

/*2.3.2. Створити об’єкт «Студент», що містить властивості
«Спеціальність», «Група» і методи: додати, змінити, видалити дані.*/

function StudentObj(specialization, group) {
    this.specialization = specialization;
    this.group = group;

    this.changeData = function (newSpecialization, newGroup) {
        this.specialization = newSpecialization;
        this.group = newGroup;
    },

    this.deleteData = function () {
        this.specialization = null;
        this.group = null;
    }
}

/*2.3.3. Реалізувати копіювання властивостей і методів об’єктів
«Користувач» і «Студент».*/

///////НИЖЧЕ У РЕЗУЛЬТАТАХ РОБОТИ

/*2.3.4. Додати в прототип об’єкту «Студент» метод «Показати дані» */

StudentObj.prototype.showData = function () {
    console.log('Student specialization: ' + this.specialization + ';\n group: ' + this.group + ';');
};

/* 2.3.5. Створити об’єкт «Успішність», що наслідує властивості і методи
об’єкту «Студент» і має додаткові властивості «Тест», «Спроба», «Бали»*/

function SuccessObj(specialization, group, test, attempts, points) {
    StudentObj.call(this, specialization, group);
    this.test = test;
    this.attempts = attempts;
    this.points = points;

    this.averagePoint = function () {
        let allPoints = 0;
        for (i = 0; i < this.points.length; i++) {
            allPoints += this.points[i];
        }
        return allPoints / this.attempts;
    }
}
SuccessObj.prototype = Object.create(StudentObj.prototype);
Object.defineProperty(SuccessObj.prototype, 'constructor', {
    value: SuccessObj,
    enumerable: false,
    writable: true
});

SuccessObj.prototype.showData = function () {
    console.log('Student specialization: ' + this.specialization + ';\ngroup: ' + this.group + ';\ntest: ' + this.test + ';\nattempts: ' + this.attempts + ';\npoints: ' + this.points + ';\naverage point: ' + this.averagePoint() + ';');
}

/*2.3.6. Реалізувати класи «Студент» і «Успішність» з такими же
методами і властивостями як і попередні об’єкти. «Успішність» наслідує
методи та властивості від «Студент». При реалізації використовувати
геттери і сеттери, наприклад, для перевірки даних чи виведення в різних
виглядах інформацію.*/

class Student {
    constructor(specialization, group) {
        this._specialization = specialization;
        this._group = group;
    }

    changeData(newSpecialization, newGroup) {
        this._specialization = newSpecialization;
        this._group = newGroup;
    }

    deleteData() {
        this._specialization = null;
        this._group = null;
    }

    get specialization() {
        return this._specialization;
    }

    get group() {
        return this._group;
    }


    showData() {
        console.log('Student specialization: ' + this.specialization + ';\ngroup: ' + this.group + ';');
    }
}

class Success extends Student {
    constructor(specialization, group, test, attempts, points) {
        super(specialization, group);
        this.setAttempts(attempts);
        this.setTest(test);
        this.setPoints(points);
    }

    setAttempts(attempts) {
        if (attempts > 0) {
            this._attempts = attempts;
        }
        else {
            console.log('The student must have at least 1 attempt!')
        }
    }

    setTest(test) {
        if (test.length > 4) {
            this._test = test;
        }
        else {
            console.log('Give the correct test name')
        }
    }

    setPoints(points) {
        if (points.length === this.attempts) {
            this._points = points;
        }
        else {
            console.log('The number of points must be the same as the number of attempts!')
        }
    }

    averagePoint() {
        let allPoints = 0;
        for (let i = 0; i < this.points.length; i++) {
            allPoints += this.points[i];
        }
        return allPoints / this.attempts;
    }

    get attempts() {
        return this._attempts;
    }

    get test() {
        return this._test;
    }

    get points() {
        return this._points;
    }

    showData() {
        console.log('Student specialization: ' + this.specialization + ';\ngroup: ' + this.group + ';\ntest: ' + this.test + ';\nattempts: ' + this.attempts + ';\npoints: ' + this.points + ';\naverage point: ' + this.averagePoint() + ';');
    }
}

/* 2.3.7. Продемонструвати роботу кожного завдання. У коді виділити
коментарями виконання кожного завдання. */
//Спочатку результати щодо звичайних об'єктів (без класів)
console.log("Results:");

const userObject = new UserObj("Грушовець", "Денис");
console.log("Obj User", userObject);

const studentObject = new StudentObj("Student", "TP-11");
console.log("Obj Student", studentObject);

studentObject.changeData("Not a student", "NN-12");
console.log('Onj Student after changeData', studentObject);

console.log('showData result:');
studentObject.showData();

const copyObj = Object.assign({}, userObject, studentObject);
console.log('Copy Student and Result: ', copyObj);

studentObject.deleteData();
console.log('Obj student after deleteData', studentObject);

const successObject = new SuccessObj("Stdent", "Res-21", "Some Test", 3, [9, 10, 6]);
console.log('Obj Success', successObject);
console.log('Obj Success Prototype:', successObject.__proto__);
console.log('showData result:');
successObject.showData();



console.log("--Classes--");

const student = new Student("Student", "ROCK-21");
console.log('Obj Student:', student);
student.changeData("New Student", "ROCK-00");
console.log('Оbj Student after changeData:', student);
console.log('Get:', student.specialization, student.group);
console.log('showData result:');
student.showData();

const success = new Success("Testing", "SS-01", "Some test", 2, [9, 8]);
console.log('Obj Success:', success);
console.log('Setter exception:');
success.setPoints([8, 9, 10]);
console.log('Get: ', success.specialization, success.group, success.test, success.attempts, success.points);
console.log('showData result:');
success.showData();