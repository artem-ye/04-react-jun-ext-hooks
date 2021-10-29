import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";

import FormComponent, { TextField, SelectField } from '../../common/form';

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState({});
    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const getQualities = (elements) => {
        const qualitiesQrray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesQrray.push(qualities[qualy]);
                }
            }
        }
        return qualitiesQrray;
    };

    const handleSubmit = (formData) => {
        // e.preventDefault();
        const { profession, qualities } = formData;
        api.users
            .update(userId, {
                ...formData,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((formData) => history.push(`/users/${formData._id}`));
        // console.log('form data updated', formData);
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id
            }))
        );
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <FormComponent formData={data} onSubmit={handleSubmit} validatorConfig={validatorConfig}>
                            <TextField
                                label="Имя"
                                name="name"
                                autoFocus
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                name="profession"
                                defaultOption="Choose..."
                                options={professions}
                            />
                            <button
                                type="submit"
                                disabled={false}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </FormComponent>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
