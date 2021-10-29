import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import validator from '../../../utils/validator';

const FormComponent = ({ children, formData, onSubmit, validatorConfig }) => {
    const [data, setData] = useState(formData);
    const [errors, setErrors] = useState({});

    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(data);
    };

    const handleKeyDown = useCallback((event) => {
        // ENTER
        if (event.keyCode === 13) {
            event.preventDefault();
            const targetForm = event.target.form;
            const activeElementIndex = Array.prototype.indexOf.call(targetForm, event.target);
            targetForm.elements[activeElementIndex + 1].focus();
            console.log(event);
        };
    });

    // -------------------------------------------------
    // Validation
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => validate(), [data]);
    // -------------------------------------------------

    const formBody = React.Children.map(children, child => {
        const childType = typeof child.type;
        const childProps = child.props;

        const conf = {
            ...childProps
        };

        const isSubmitButton =
            (childType === 'string') &&
            (childProps.type === 'submit' || childProps.type === undefined);

        if (isSubmitButton) {
            conf.disabled = !isValid;
        } else {
            const NAME = childProps.name;

            if (!NAME) {
                throw new Error('name property is required for \n' +
                    JSON.stringify(childProps)
                );
            }

            conf.value = data[NAME];
            conf.onChange = handleChange;
            conf.value = data[NAME];
            conf.error = errors[NAME];
            conf.onKeyDown = handleKeyDown;
        }

        return React.cloneElement(child, conf);
    });

    return (
        <form onSubmit={handleSubmit}>
            <h5>Form component</h5>
            {
                formBody
            }
        </form>
    );
};

FormComponent.propTypes = {
    children: PropTypes.node,
    formData: PropTypes.object,
    onSubmit: PropTypes.func,
    validatorConfig: PropTypes.object
};

export default FormComponent;
