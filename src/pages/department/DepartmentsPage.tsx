import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import { Button, Dialog, DropDown, EducationList, EmployeesList, FilesList, TextField, WorkExperienceList } from '../../components';
import { Department, Employee } from '../../types/models';
import { DropDownItem } from '../../components/dropDown/DropDownProps';
import { PlusIcon, UploadIcon } from '../../assets/icons';
import './departmentsPageStyles.scss';
import { format } from 'date-fns';

const fakeEmployeesData = [
    { id: 1, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov@mail.ru', phoneNumber: '8-800-535-35-35' },
    { id: 2, lastName: 'Петров', firstName: 'Сергей', midleName: 'Дмитриевич', birthDate: new Date().toISOString(), email: 'petrov@mail.ru', phoneNumber: '8-800-535-35-36', 
        educations: [{
            id: 1,
            description: 'Системный администратор',
            title: 'ВГПТТ №36'
        },{
            id: 2,
            description: 'Информационные системы и технологии',
            title: 'ФГБОУ ВГПУ'
        },{
            id: 3,
            description: 'Курсы повышения квалификации',
            title: 'Яндекс практикум'
        }], 
        workExpirience: [{
            id: 1,
            workedYears: 3,
            description: 'ООО "Техинформ сервис"'
        },{
            id: 2,
            workedYears: 2,
            description: 'Data art'
        },{
            id: 3,
            workedYears: 4,
            description: 'ООО "Рексофт"'
        }] 
    },
    { id: 3, lastName: 'Джон', firstName: 'Смитт', birthDate: new Date().toISOString(), email: 'john@mail.ru', phoneNumber: '8-800-535-35-37' },
    { id: 4, lastName: 'Рябчикова', firstName: 'Лидия', midleName: 'Анатольевна', birthDate: new Date().toISOString(), email: 'ryaba@mail.ru', phoneNumber: '8-800-535-35-38' },
    { id: 5, lastName: 'Семенов', firstName: 'Олег', midleName: 'Артемович', birthDate: new Date().toISOString(), email: 'semenov@mail.ru', phoneNumber: '8-800-535-35-39' }
] as Array<Employee>;

const fakeDepartmentsData = [
    { id: 1, name: 'Отдел 1', employees: [] },
    { id: 2, name: 'Отдел 2', employees: fakeEmployeesData },
    { id: 3, name: 'Отдел 3', employees: [] }
] as Array<Department>;

export const DepartmentsPage: FC = () => {
    const [departmentsData, setDepartmentsData] = useState<Array<Department>>([]);
    const [employeesData, setEmployeesData] = useState<Array<Employee>>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [userToEdit, setUserToEdit] = useState(0);
    
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [midleName, setMidleName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        setTimeout(()=> {
            setDepartmentsData(fakeDepartmentsData);
            if(Array.isArray(fakeDepartmentsData) && fakeDepartmentsData.length) {
                setSelectedDepartmentId(fakeDepartmentsData[0].id);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        const selectedDepartment = departmentsData.find(d => d.id === selectedDepartmentId);
        setEmployeesData(selectedDepartment ? selectedDepartment.employees : []);
        setSelectedEmployee(undefined);
    }, [departmentsData, selectedDepartmentId]);

    useEffect(() => {
        if(userActionMode === 'edit') {
            const employee = userActionMode === 'edit' 
                ? employeesData.find(e => e.id === userToEdit) 
                : undefined;    

            setLastName(employee?.lastName ?? '');
            setFirstName(employee?.firstName ?? '');
            setMidleName(employee?.midleName ?? '');
            setBirthDate(employee?.birthDate ?? '');
            setEmail(employee?.email ?? '');
            setPhoneNumber(employee?.phoneNumber ?? '');
        }
    }, [employeesData, userActionMode, userToEdit])

    const clearEmployeeDialogFields = () => {
        setUserActionMode('create');
        setUserToEdit(0);
        setLastName('');
        setFirstName('');
        setMidleName('');
        setBirthDate('');
        setEmail('');
        setPhoneNumber('');
    }

    const createEmployeeHandler = () => {
        setUserActionMode('create');
        setShowEmployeeDialog(true);
    }

    const editEmployeeHandler = (id: number) => {
        setUserActionMode('edit');
        setUserToEdit(id);
        setShowEmployeeDialog(true);
    }

    const userDialogContentRenderer = () => {
        return (
            <>
                <TextField labelText="Фамилия" value={lastName} onChange={(val) => setLastName(val)}/>
                <TextField labelText="Имя" value={firstName} onChange={(val) => setFirstName(val)} />
                <TextField labelText="Отчество" value={midleName} onChange={(val) => setMidleName(val)} />
                <TextField labelText="Дата рождения" value={birthDate} onChange={(val) => setBirthDate(val)} />
                <TextField labelText="Email" value={email} onChange={(val) => setEmail(val)} />
                <TextField labelText="Телефон" value={phoneNumber} onChange={(val) => setPhoneNumber(val)} />
            </>
        );
    }

    const closeEmployyeDialogHandler = () =>{
        setShowEmployeeDialog(false);
        clearEmployeeDialogFields();
    }

    const depatmentChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedDepartmentId(_id);
    }

    const onEmployeeSelectedHandler = (id: number) => {
        const employee = employeesData.find(e => e.id === id);
        setSelectedEmployee(employee);
    }

    const getFIO = () => {
        if(!selectedEmployee) {
            return '';
        }
        return `${selectedEmployee.lastName} ${selectedEmployee.firstName} ${selectedEmployee.midleName ?? ''}`.trim();
    }

    const uploadFileHandler = () => {
    }

    const downloadFileHandler = (id: number) => {
    }

    const deleteFileHandler = (id: number) => {
    }

    return (
        <Layout>
            <Dialog title={userActionMode !== 'edit' ? 'Добавить сотрудника' : 'Изменить  сотрудника'}
                open={showEmployeeDialog} 
                onSave={() => {}}
                onCancel={closeEmployyeDialogHandler}
            >
                {userDialogContentRenderer()}
            </Dialog>
            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <div className="dep-page__departments-list">
                        <DropDown className="dep-page__departments-drop-down"
                            items={departmentsData.map(dd => {
                                    return {
                                        text: dd.name,
                                        value: dd.id.toString()
                                    } as DropDownItem;
                                })
                            } 
                            label="Отделы:" 
                            selectedChanged={(val) => depatmentChangedHandler(val)}
                        />
                        <PlusIcon width={16} height={16} className="dep-page__add-btn" />
                    </div>
                    <EmployeesList employeesList={employeesData}
                        onItemClick={(id) => onEmployeeSelectedHandler(id)}
                        onItemDelete={(id) => console.log('delete ', id)}
                        onItemEdit={editEmployeeHandler}
                    />
                    <Button text="Добавить сотрудника" className="dep-page__add-user-btn" onClick={createEmployeeHandler} />
                </div>
                <div className="dep-page__user-info-container">
                    <div className="dep-page__user-info-header">
                        <div className="dep-page__use-info-user">
                            <div className="dep-page__user-info-fullname">
                                {getFIO()}
                            </div>
                            <div className="dep-page__user-info-pers-data">
                                <div>
                                    <strong>Дата рождения: </strong>
                                    <span>{
                                        selectedEmployee?.birthDate 
                                            ? format(new Date(selectedEmployee.birthDate), 'dd.MM.yyyy')
                                            : '-'
                                        }
                                    </span>
                                </div>
                                <div>
                                    <strong>Email: </strong>
                                    <span>{selectedEmployee?.email ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Телефон: </strong>
                                    <span>{selectedEmployee?.phoneNumber ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="dep-page__user-info-actions">
                            <UploadIcon onClick={uploadFileHandler} color="#7a7a7a" />
                        </div>
                    </div>
                    <div className="dep-page__user-add-info">
                        <div className="dep-page__user-add-info-files">
                            <span className="dep-page__label">
                                Прикрепленные файлы:
                            </span>
                            <FilesList 
                                onFileDownload={downloadFileHandler}
                                onFileDelete={deleteFileHandler}
                                filesList={[{
                                    id: 1,
                                    displayName: 'my file.txt',
                                    systemName: 'asadasd'
                                }, {
                                    id: 2,
                                    displayName: 'my file 2.txt',
                                    systemName: 'asadasd'
                                }]} 
                            />
                        </div>
                        <div className="dep-page__user-add-info-data">
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">
                                        Данные об образовании:
                                    </span>
                                    <PlusIcon width={16} height={16} className="dep-page__add-btn" />
                                </div>
                                <EducationList educationList={[{
                                    id: 1,
                                    description: 'Инженер-программист',
                                    title: 'Высшее образование'
                                },{
                                    id: 2,
                                    description: 'Системный администратор',
                                    title: 'Высшее образование'
                                }]} />
                            </div>
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">
                                        Данные о работе:
                                    </span>
                                    <PlusIcon width={16} height={16} className="dep-page__add-btn" />
                                </div>
                                <WorkExperienceList workExperienceList={[{
                                    id: 1,
                                    workedYears: 3,
                                    description: 'ООО "Рога и копыта"'
                                },{
                                    id: 2,
                                    workedYears: 5,
                                    description: 'ООО "Рексофт"'
                                }]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
