import { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import Select from "react-select";
import { useRouter } from 'next/router'
import _, { template } from 'lodash'
export default function register() {
    const router = useRouter()
    const { slug } = router.query
    const [psychologist, setPsychologist] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [company, setCompany] = useState('')
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
    const [serviceArray, setServiceArray] = useState([])
    const [companyName, setCompanyName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyInfo, setCompanyInfo] = useState('')
    const [counties, setCounties] = useState([])
    const [languages, setLanguages] = useState([])
    const [services, setServices] = useState([])
    const [therapyForms, setTherapyForms] = useState([])
    const [targetGroups, setTargetGroups] = useState([])
    const [companys, setCompanys] = useState([])
    const [companyEditView, setCompanyEditView] = useState(false)
    const hiddenFileInput = useRef(null)
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
    const handleEdit = () => {
        axios.put(`http://localhost:7777/psychologist/${slug}`, {
            firstName: firstName,
            lastName: lastName,
            company: company,
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
            companyName: companyName,
            companyInfo: companyInfo,
            companyAddress: companyAddress,
            companyId: psychologist.company.id,
            isAdmin: psychologist.isAdmin
          })
          .then(function (response) {
            console.log(response);
            location.href = "/"
          })
          .catch(function (error) {
            console.log(error);
          });
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
            setCounties(res.data)
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
                services.push({value: item.id, label: item.name, price: item.hourlyRate})
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
        // axios.get('http://localhost:7777/company').then(res => {
        //     const companys = []
        //     res.data.map((item) => {
        //         companys.push({value: item.id, label: item.name})
        //     })
        //     setCompanys(companys)
        // })
    }, [])

    useEffect(() => {
        if(psychologist) {
            if (psychologist.isAdmin) {
                setCompanyEditView(true)
                setCompanyAddress(psychologist.company.address)
                setCompanyInfo(psychologist.company.info)
                setCompanyName(psychologist.company.name)
            }
            const selected_language = []
            const selected_targetGroup = []
            const selected_theraphy = []
            const selected_service = []
            let remain_service = []
            psychologist.PsychologistLanguages?.map((item) => {
                selected_language.push({value: item.language.id, label: item.language.name})
            })
            psychologist.PsychologistTargetGroup?.map((item) => {
                selected_targetGroup.push({value: item.targetGroup.id, label: item.targetGroup.name})
            })
            psychologist.PsychologistTherapyForm?.map((item) => {
                selected_theraphy.push({value: item.therapyForm.id, label: item.therapyForm.name})
            })
            psychologist.PsychologistServices?.map((item) => {
                selected_service.push({value: item.service.id, label: item.service.name, price: item.hourlyRate})
            })
            remain_service = _.differenceWith(services, selected_service, (a, b) => (a.value == b.value))
            // console.log("---------------------------------------->",services, selected_service)
            setFirstName(psychologist.firstName)
            setLastName(psychologist.lastName)
            setCity(psychologist.city)
            setGender(psychologist.sex)
            setRefund(psychologist.refundDeal)
            setAddress(psychologist.streetAddress)
            setWebsite(psychologist.website)
            setAbout(psychologist.about)
            setUniversity(psychologist.university)
            setGraduate(psychologist.gradYear)
            setSpecialistEdu(psychologist.specialistEdu)
            setCounty(psychologist.county?.id)
            setLanguage(selected_language)
            setTargetGroup(selected_targetGroup)
            setTherapyForm(selected_theraphy)
            setServiceArray(selected_service)
            setServices(remain_service)
        }
    }, [psychologist])

    useEffect(() => {
        if(slug) {
            axios.get(`http://localhost:7777/psychologist/${slug}`).then(res => {
                console.log("------------->", res.data)
                setPsychologist(res.data)
            })
        }
    }, [slug])
    return (
        <>
            <Layout>
                <div className="container">
                    <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Edit psychologist</p>
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
                            <div>firstName</div>
                            <input className="input-newsletter w-search" value={firstName} required type="text" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>lastName</div>
                            <input className="input-newsletter w-search" value={lastName} required type="text" onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <div>Sex</div>
                          
                            <label className="mr-5">
                                <input className="float-start mr-5 mt-6" type="radio" name="sex" checked={sex == 'Male' ? true : false} onChange={(e) => setGender(e.target.value)} value="Male" /> male
                            </label>
                            <label>
                                <input className="float-start mr-5 mt-6" type="radio" name="sex" checked={sex == 'Female' ? true : false} onChange={(e) => setGender(e.target.value)} value="Female" /> female
                            </label>
                            
                        </div>
                       
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>County</div>
                            <select className="form-control w-search select-active" value={county} onChange={(e) => setCounty(e.target.value)}>
                                {
                                    counties.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-md-4">
                            <div>City</div>
                            <input className="input-newsletter w-search" value={city} type="text" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Street Address</div>
                            <input className="input-newsletter w-search" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Website Url</div>
                            <input className="input-newsletter w-search" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Refund Deal</div>
                            <div>
                                <label className="mr-5">
                                    <input className="float-start mr-5 mt-6" type="radio" name="refund" checked={refund == 1 ? true : false} value={1} onChange={(e) => setRefund(e.target.value)} /> Yes
                                </label>
                                <label className="mr-5">
                                    <input className="float-start mr-5 mt-6" type="radio" name="refund" checked={refund == 0 ? true : false} value={0} onChange={(e) => setRefund(e.target.value)} /> No
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>University</div>
                            <input className="input-newsletter w-search" type="text" value={university} onChange={(e) => setUniversity(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div>Graduation Year</div>
                            <input className="input-newsletter w-search" type="number" value={graduate} onChange={(e) => setGraduate(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>About</div>
                            <textarea className="input-newsletter w-search" type="text" value={about} onChange={(e) => setAbout(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <div>Specialist Education</div>
                            <input className="input-newsletter w-search" type="text" value={specialistEdu} onChange={(e) => setSpecialistEdu(e.target.value)} />
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
                                value={language}
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
                                value={targetGroup}
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
                                value={therapyForm}
                            />
                        </div>
                       
                       
                    </div>
                 
                    {
                        companyEditView ? 
                        <div className="row align-items-center"> 
                            <div className="col-md-4">
                                <div>Company Name</div>
                                <input className="input-newsletter w-search" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}  />
                            </div>
                            <div className="col-md-4">
                                <div>address</div>
                                <input className="input-newsletter w-search" type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)}   />
                            </div>
                            <div className="col-md-4">
                                <div>info</div>
                                <input className="input-newsletter w-search" type="text" value={companyInfo} onChange={(e) => setCompanyInfo(e.target.value)}  />
                            </div>
                        </div> : 
                        ""
                    }
                    <div className="col-md-4">
                        <button className="btn btn-default btn-find font-sm" onClick={handleEdit} >Save</button>
                    </div>    
                    
                </div>
            </Layout>
        </>
    )
}