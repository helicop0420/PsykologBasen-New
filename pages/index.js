/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState,  } from "react";
import Layout from "../components/Layout/Layout";
import axios from 'axios';
import { useSelector } from "react-redux";
import Select from "react-select";

export default function Index2() {
    const [service, setService] = useState('')
    const [county, setCounty] = useState('')
    const [name, setName] = useState('')
    const [university, setUniversity] = useState('')
    const [language, setLanguage] = useState('')
    const [company, setCompany] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [website, setWebsite] = useState('')
    const [about, setAbout] = useState('')
    const [data, setData] = useState([])
    const [targetGroup, setTargetGroup] = useState('')
    const [graduationFrom, setGraduationFrom] = useState('')
    const [graduationTo, setGraduationTo] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [therapyForm, setTherapyForm] = useState('')
    const [counties, setCounties] = useState([])
    const [languages, setLanguages] = useState([])
    const [services, setServices] = useState([])
    const [therapyForms, setTherapyForms] = useState([])
    const [targetGroups, setTargetGroups] = useState([])
    const [specialists, setSpecialists] = useState([])
    const serviceRef = useRef(null)
    const countyRef = useRef(null)
    const languageRef = useRef(null)
    const targetGroupRef = useRef(null)
    const therapyFormRef = useRef(null)
    const specialistRef = useRef(null)
    // const { user } = useSelector(({ user }) => user); 
    // console.log("user------->", user)
    const handleEdit = (item) => {
        location.href = `/edit/${item.id}`
    }
    function handleServiceChange(event) {
        // Overwrite the event with your own object if it doesn't exist
        if (!event) {
          event = {
            target: serviceRef,
            value: '',
          };
        }
        setService(event.value);
    }
    function handleCountyChange(event) {
        // Overwrite the event with your own object if it doesn't exist
        if (!event) {
          event = {
            target: countyRef,
            value: '',
          };
        }
        setCounty(event.value);
    }
    function handleLanguageChange(event) {
        // Overwrite the event with your own object if it doesn't exist
        if (!event) {
          event = {
            target: languageRef,
            value: '',
          };
        }
        setLanguage(event.value);
    }
    function handleTargetGroupChange(event) {
        // Overwrite the event with your own object if it doesn't exist
        if (!event) {
          event = {
            target: targetGroupRef,
            value: '',
          };
        }
        setTargetGroup(event.value);
    }
    function handleTherapyFormChange(event) {
        // Overwrite the event with your own object if it doesn't exist
        if (!event) {
          event = {
            target: therapyFormRef,
            value: '',
          };
        }
        setTherapyForm(event.value);
    }
    function handleSpecialistChange(event) {
        if (!event) {
            event = {
              target: specialistRef,
              value: '',
            };
          }
          setSpecialist(event.value);
    }
    useEffect(() => {
        axios.get(`http://localhost:7777/psychologist?service=${service}&county=${county}&specialist=${specialist}&graduationFrom=${graduationFrom}&graduationTo=${graduationTo}&name=${name}&university=${university}&language=${language}&targetGroup=${targetGroup}&therapyForm=${therapyForm}&company=${company}&city=${city}&address=${address}&website=${website}&about=${about}`).then(res => {
            setData(res.data)
            console.log(res)
        });
    }, [service, county,specialist, name, graduationFrom, graduationTo, language, company, university, city, address, website, about, targetGroup, therapyForm])

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
        axios.get('http://localhost:7777/specialist').then(res => {
            const specialists = []
            res.data.map((item) => {
                specialists.push({value: item.id, label: item.name})
            })
            setSpecialists(specialists)
        })
    }, [])
    return (
        <>
            <Layout>
                <div className="d-flex container"> 
                    <div className="p-5">
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Service </p>
                            <Select
                                isClearable={true}
                                ref={serviceRef} 
                                className="basic-single"
                                classNamePrefix="select"
                                options={services}
                                onChange={handleServiceChange}
                            />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">County </p>
                            <Select
                                isClearable={true}
                                ref={countyRef} 
                                className="basic-single"
                                classNamePrefix="select"
                                options={counties}
                                onChange={handleCountyChange}
                            />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Target Group </p>
                            <Select
                                isClearable={true}
                                ref={targetGroupRef} 
                                className="basic-single"
                                classNamePrefix="select"
                                options={targetGroups}
                                onChange={handleTargetGroupChange}
                            />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Therapeutic Orientation </p>
                            <Select
                                isClearable={true}
                                ref={therapyFormRef} 
                                className="basic-single"
                                classNamePrefix="select"
                                options={therapyForms}
                                onChange={handleTherapyFormChange}
                            />
                        </div>
                      
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Language </p>
                            <Select
                                isClearable={true}
                                ref={languageRef} 
                                className="basic-single"
                                classNamePrefix="select"
                                options={languages}
                                onChange={handleLanguageChange}
                            />
                        </div>

                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Specialist</p>
                            <Select
                                isClearable={true}
                                ref={specialistRef} 
                                className="basic-single"
                                classNamePrefix="select"
                                options={specialists}
                                onChange={handleSpecialistChange}
                            />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Name </p>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setName(e.target.value)}  />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Company </p>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setCompany(e.target.value)}  />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">City </p>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setCity(e.target.value)}  />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">University </p>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setUniversity(e.target.value)}  />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Graduation Year </p>
                            <input className="input-newsletter w-search" type="number" onChange={(e) => setGraduationFrom(e.target.value)}  />
                            <p> ~ </p>
                            <input className="input-newsletter w-search" type="number" onChange={(e) => setGraduationTo(e.target.value)}  />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Street Address </p>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setAddress(e.target.value)}  />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">Website URL </p>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setWebsite(e.target.value)}  />
                        </div>
                        <div>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp p-1">About </p>
                            <input className="input-newsletter w-search" type="text" onChange={(e) => setAbout(e.target.value)}  />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="d-flex">
                            {
                                data.map(item => (
                                    <div className="p-2 border m-2 psy-card" >
                                        <div>{item.firstName + ' ' + item.lastName}</div>
                                        <div className="d-flex">
                                            {
                                                item.city &&
                                                <div>city : {item.city}</div> 
                                            }
                                            {
                                                item.address &&
                                                <div>address : {item.address}</div>
                                            }
                                        </div>
                                        <div>
                                            {
                                                item.phoneNumber && 
                                                <div>phoneNumber : {item.phoneNumber}</div>
                                            }
                                        </div>
                                        <div>
                                            {
                                                item.gradYear && 
                                                <div>graduate year : {item.gradYear}</div>   
                                            }
                                        </div>
                                        <div>
                                            {
                                                item.postalCode && 
                                                <div>postal code : {item.postalCode}</div>   
                                            }
                                        </div>
                                        <div>
                                            {
                                                item.website && 
                                                <div>website : {item.website}</div>   
                                            }
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
