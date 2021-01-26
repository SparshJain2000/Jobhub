import React from "react";
const About = () => (
    <>
        <div className='p-3 bg-white'>
            <h3 className='text-align-center'>About Us</h3>
        </div>
        <section className='bg-light-gray d-flex flex-column'>
            <article className='abt-card '>
                <h4 className='text-align-center'>Who are we</h4>
                <hr className='col-10 col-md-3 mx-auto header-line mt-1' />
                <p>
                    JobHub is a platform which helps customers book reliable
                    home services like cleaning, wall painting, plumbing,
                    carpentry, appliance repair, painting etc. And it works both
                    ways, the workers can search the job sections and apply to
                    the job and will be selected by the customer based on the
                    rating given by previous customers. The company's vision is
                    to empower millions of service professionals across the
                    world to deliver services at home like never seen before.
                    The company partners with tens of thousands of service
                    professionals, helping them with with training, credit,
                    product procurement, insurance, technology etc.
                </p>
            </article>
            <article className='abt-card '>
                <h4 className='text-align-center'>How we do it</h4>
                <hr className='col-10 col-md-3 mx-auto header-line mt-1' />
                <p>
                    JobHub provides a platform that allows skilled and
                    experienced professionals to connect with users looking for
                    specific services. All the professionals, though experienced
                    and skilled. Professionals are authorized through government
                    identification before registering on portal. Once on the
                    platform, our match-making algorithm identifies
                    professionals who are closest to the users’ requirements and
                    available at the requested time and date.
                </p>
            </article>
        </section>
    </>
);
export default About;
