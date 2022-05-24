import React from 'react'

function Accordion() {
  return (
    <div className="accordion accordion-flush mw-100" id="accordionFlushExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed text-uppercase bg-color-success fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Items
                </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    Save common items and insert them fastly in your file
                </div>
            </div>
        </div>

        <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
            <button className="accordion-button collapsed text-uppercase fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Date / Time 
            </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    Cells in date or time format, you can use automatic date and time too &#128521;.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
            <button className="accordion-button collapsed text-uppercase fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Currency
            </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    Specific Currency Box, you can change your currency, press &#x2191; to add +50 or &#x2193; to decrease -50.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFour">
            <button className="accordion-button collapsed text-uppercase fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                Type your Cell
            </button>
            </h2>
            <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    It counts with prefix and sufix options to customize.
                    So that if you desire, you can insert your cell text manually
                </div>
            </div>
        </div>
    </div>
  )
}

export default Accordion