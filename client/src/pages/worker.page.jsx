import React, { useState, useEffect } from "react";
import WorkerInput from "../components/workerInput.component";
import WorkerCard from "../components/workerCard.component";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Error from "../assets/error.svg";
import Loader from "../components/loader.component";
import WorkerModal from "../components/worker.component";
import { useQuery } from "@apollo/client";
import { SEARCH_WORKERS } from "../graphql/query";
const WorkerList = ({
    query,
    setCurrentEmployee,
    setEmployeeModal,
    setErrorModal,
    setErrorMsg,
}) => {
    const { loading, data, error } = useQuery(SEARCH_WORKERS, {
        variables: query,
    });
    if (loading) return <Loader />;
    if (error) {
        console.log({ ...error });
        const msg = error?.networkError?.result?.errors[0]?.message;
        if (msg) {
            setErrorModal(true);
            setErrorMsg(
                msg === "UNAUTHENTICATED"
                    ? "Please login first to see details"
                    : "Something went wrong. Try again later.",
            );
        }
        return (
            <div className='w-100 text-align-center p-3'>
                <img src={Error} alt='' className='error-img' />
                <h5>Something went wrong. Try again later</h5>
            </div>
        );
    }

    return (
        <div className='row col-12 col-md-10 mx-auto px-0 my-2'>
            {data?.searchEmployees && data?.searchEmployees.length === 0 ? (
                <p className='w-100 text-align-center'>
                    No Professionals Found
                </p>
            ) : (
                data?.searchEmployees?.map((worker) => (
                    <WorkerCard
                        worker={worker}
                        key={worker._id}
                        setCurrentEmployee={setCurrentEmployee}
                        setEmployeeModal={setEmployeeModal}
                    />
                ))
            )}
        </div>
    );
};
const Worker = (props) => {
    const [query, setQuery] = useState({});
    const [employeeModal, setEmployeeModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const toggleErrorModal = () => setErrorModal(!errorModal);
    const toggleEmployeeModal = () => setEmployeeModal(!employeeModal);
    useEffect(() => {
        if (props?.location?.state?.query) setQuery(props.location.state.query);
    }, [props?.location?.state?.query]);
    return (
        <>
            <div className='p-2 bg-white'>
                <h4 className='text-align-center'>Professionals</h4>
            </div>
            <hr className='my-0' />
            <WorkerInput query={query} setQuery={setQuery} />
            <WorkerList
                query={query}
                setCurrentEmployee={setCurrentEmployee}
                setEmployeeModal={setEmployeeModal}
                setErrorModal={setErrorModal}
                setErrorMsg={setErrorMsg}
            />
            <Modal
                className='worker-modal'
                isOpen={employeeModal}
                toggle={toggleEmployeeModal}>
                <ModalBody>
                    <WorkerModal
                        currentEmployee={currentEmployee}
                        setCurrentEmployee={setCurrentEmployee}
                    />
                </ModalBody>
                <ModalFooter className='p-1'>
                    <Button size='sm' onClick={toggleEmployeeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal
                className='error-modal'
                isOpen={errorModal}
                toggle={toggleErrorModal}>
                <ModalBody>{errorMsg}</ModalBody>
                <ModalFooter className='p-1'>
                    <Button size='sm' onClick={toggleErrorModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
export default Worker;
