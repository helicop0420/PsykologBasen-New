import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from 'axios';
import Select from "react-select";

export default function register() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [service, setService] = useState('')
    const [county, setCounty] = useState('')
    const [language, setLanguage] = useState('')
    const [therapyForm, setTherapyForm] = useState('')
    const [sex, setGender] = useState('')
    const [refund, setRefund] = useState(false)
    const [address, setAddress] = useState('')
    const [website, setWebsite] = useState('')
    const [about, setAbout] = useState('')
    const [university, setUniversity] = useState('')
    const [graduate, setGraduate] = useState('')
    const [specialistEdu, setSpecialistEdu] = useState('')
    const [targetGroup, setTargetGroup] = useState('')
    const [price, setPrice] = useState('')
    const [avatar, setAvatar] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serviceArray, setServiceArray] = useState([])
    const [counties, setCounties] = useState([])
    const [languages, setLanguages] = useState([])
    const [services, setServices] = useState([])
    const [therapyForms, setTherapyForms] = useState([])
    const [targetGroups, setTargetGroups] = useState([])
    const [companys, setCompanys] = useState([])

    const [companyType, setCompanyType] = useState('')
    const [requestCompany, setRequestCompany] = useState('')
    const [companyInfo, setCompanyInfo] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyName, setCompanyName] = useState('')
    const hiddenFileInput = useRef(null)
    const genderOptions = [{value: 'male', label: 'male'}, {value: 'female', label: 'female'}, {value: 'non-binary', label: 'non-binary'}, {value: 'transgender', label: 'transgender'}]
    const handleRegister = () => {
        axios.post('http://localhost:7777/psychologist/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            requestCompany: requestCompany,
            city: city,
            service: serviceArray,
            countyId: county,
            language: language,
            therapyForm: therapyForm,
            sex: sex,
            refundDeal: refund,
            address: address,
            website: website,
            about: about,
            avatar: avatar,
            university: university,
            gradYear: graduate,
            specialistEdu: specialistEdu,
            targetGroup: targetGroup,
            companyAddress: companyAddress,
            companyInfo: companyInfo,
            companyName: companyName
          })
          .then(function (response) {
            console.log(response);
            location.href = "/"
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleRemoveService = (item) => {
        const tmp = [
            ...serviceArray
        ]
        setServiceArray(tmp.filter(el => el.value != item.value))
        const tmpArr = [
            ...services,
        ]
        tmpArr.push(item)
        setServices(tmpArr)
    }
    
    const handleService = () => {
        const tmp =  {
            ...service,
            price: price
        }
        const arr = [
            ...serviceArray,
            tmp
        ]
        const tmpArr = []
        services.map((item) => {
            if(item.value != service.value) {
                tmpArr.push(item)
            }
        })
        setServices(tmpArr)
        setServiceArray(arr)
        setService('')
        setPrice('')
       
    }
    const handleChangeType = (e) => {
        setCompanyType(e.target.value)
        if (e.target.value == 'register') {
            setRequestCompany('')
        } else if (e.target.value == 'request') {
            setCompanyName('')
            setCompanyInfo('')
            setCompanyAddress('')
        }
    }
    const handleFileClick = event => {
        hiddenFileInput.current.click();
    };
    const handleFilesChange = (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        axios.post('http://localhost:7777/upload', formData)
            .then(res => {
                console.log(res.data.url)
                setAvatar(res.data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get('http://localhost:7777/county').then(res => {
            const counties = []
           
            res.data.map((item) => {
                counties.push({value: item.id, label: item.name})
            })
            setCounties(counties)
        })
        axios.get('http://localhost:7777/language').then(res => {
            const langs = [];
            
            res.data.map((item) => {
                langs.push({value: item.id, label: item.name})
            })
            setLanguages(langs)
        })
        axios.get('http://localhost:7777/service').then(res => {
            const services = []
            res.data.map((item) => {
                services.push({value: item.id, label: item.name})
            })
            setServices(services)
        })
        axios.get('http://localhost:7777/target_group').then(res => {
            const target_groups = []
            res.data.map((item) => {
                target_groups.push({value: item.id, label: item.name})
            })
            setTargetGroups(target_groups)
        })
        axios.get('http://localhost:7777/therapy_form').then(res => {
            const therapys = []
            res.data.map((item) => {
                therapys.push({value: item.id, label: item.name})
            })
            setTherapyForms(therapys)
        })
        axios.get('http://localhost:7777/company').then(res => {
            const companys = []
            res.data.map((item) => {
                companys.push({value: item.id, label: item.name})
            })
            setCompanys(companys)
        })
    }, [])
    return (
        <>
            <Layout>
                <div className="container">
                    <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Register a psychologist</p>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <button className="btn btn-info btn-find font-sm" onClick={handleFileClick} >Upload Avatar</button>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleFilesChange}
                                style={{display: 'none'}}
                            />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Email</div>
                            <input className="input-newsletter w-search" required type="text" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Password</div>
                            <input className="input-newsletter w-search" required type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>firstName</div>
                            <input className="input-newsletter w-search" required type="text" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>lastName</div>
                            <input className="input-newsletter w-search" required type="text" onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <div>Sex</div>
                            <Select
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={genderOptions}
                                onChange={(e) => setGender(e.value)}
                            />
                        </div>
                       
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>County</div>
                            <Select
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={counties}
                                onChange={(e) => setCounty(e.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <div>City</div>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Street Address</div>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Website Url</div>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setWebsite(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Refund Deal</div>
                            <div>
                                <label className="mr-5">
                                    <input className="float-start mr-5 mt-6" type="radio" name="refund" value={true} onChange={(e) => setRefund(e.target.value)} /> Yes
                                </label>
                                <label className="mr-5">
                                    <input className="float-start mr-5 mt-6" type="radio" name="refund" value={false} onChange={(e) => setRefund(e.target.value)} /> No
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>University</div>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setUniversity(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Graduation Year</div>
                            <input className="input-newsletter w-search" type="number" onChange={(e) => setGraduate(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>About</div>
                            <textarea className="input-newsletter w-search" type="text" onChange={(e) => setAbout(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Specialist Education</div>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setSpecialistEdu(e.target.value)} />
                        </div>
                    </div>            
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Services</div>
                            <Select
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={services}
                                onChange={(e) => setService(e)}
                            />
                            <div className="d-flex justify-content-between align-items-center">
                                {
                                    service &&
                                    <>
                                        <input type="number" onChange={(e) => setPrice(e.target.value)} />
                                        <button className="btn btn-info btn-find font-sm" onClick={handleService} disabled={!price} >Add</button>
                                    </>
                                }
                            </div>
                            <div>
                              {
                                serviceArray.map((item) => (
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p>{item.label}</p>
                                        <div className="d-flex align-items-center">
                                            <p className="mr-20">{item.price}</p>
                                            <div className="remove" onClick={() => handleRemoveService(item)}>remove</div>
                                        </div>
                                    </div>
                                ))
                              }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>Language</div>
                            <Select
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={languages}
                                onChange={(e) => setLanguage(e)}
                            />
                        </div>
                        <div className="col-md-4">
                            <div>Target Group</div>
                            <Select
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={targetGroups}
                                onChange={(e) => setTargetGroup(e)}
                            />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <div>Therapeutic orientation </div>
                            <Select
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={therapyForms}
                                onChange={(e) => setTherapyForm(e)}
                            />
                        </div>
                       
                       
                    </div>
                    <div className="row align-items-center">
                        <div>
                            <label className="mr-5">
                                <input className="float-start mr-5 mt-6" type="radio" name="companyType" onChange={handleChangeType} value="register" /> Register a company
                            </label>
                            <label>
                                <input className="float-start mr-5 mt-6" type="radio" name="companyType" onChange={handleChangeType} value="request" /> Request a company
                            </label>
                        </div>
                    </div>
                    {
                        companyType == 'register' ? 
                            
                        <div className="row align-items-center"> 
                            <div className="col-md-4">
                                <div>Company Name</div>
                                <input className="input-newsletter w-search" type="text" onChange={(e) => setCompanyName(e.target.value)}  />
                            </div>
                            <div className="col-md-4">
                                <div>address</div>
                                <input className="input-newsletter w-search" type="text" onChange={(e) => setCompanyAddress(e.target.value)}   />
                            </div>
                            <div className="col-md-4">
                                <div>info</div>
                                <input className="input-newsletter w-search" type="text"  onChange={(e) => setCompanyInfo(e.target.value)}  />
                            </div>
                        </div>
                                
                        : 
                        (companyType == 'request' ? 
                        <div className="row align-items-center">
                             <div className="col-md-4">
                                <div>Company</div>
                                <Select
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    options={companys}
                                    onChange={(e) => setRequestCompany(e.value)}
                                />
                            </div>
                        </div>
                        : "")

                    }
                    <div className="col-md-4">
                        <button className="btn btn-default btn-find font-sm" onClick={handleRegister} >Register</button>
                    </div>
                </div>
            </Layout>
        </>
    )
}