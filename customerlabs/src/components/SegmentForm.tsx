import React, { useState } from 'react';
import { EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiSelect, EuiSpacer, EuiButtonIcon, EuiHealth, EuiFlexGroup, EuiFlexItem, EuiFormErrorText } from '@elastic/eui';
import { useForm } from 'react-hook-form';
import { SegmentSchema, SegmentStructure } from './schema';

interface SegmentFormProps {
    initialOptions: SegmentSchema[];
    onSubmit: (data: SegmentStructure) => void;
}

const SegmentForm: React.FC<SegmentFormProps> = ({ initialOptions, onSubmit }) => {
    const { handleSubmit, formState: { errors }, register, setValue, clearErrors } = useForm<SegmentStructure>();
    const [segmentName, setSegmentName] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<SegmentSchema[]>([]);
    const [newSchema, setNewSchema] = useState<string>('');

    const handleAddSchema = () => {
        if (newSchema) {
            const selectedOption = initialOptions.find(option => option.value === newSchema);
            if (selectedOption) {
                setSelectedOptions(prevOptions => [...prevOptions, selectedOption]);
                setNewSchema('');
            }
        }
    };

    const handleRemoveOption = (indexToRemove: number) => {
        setSelectedOptions(prevOptions => prevOptions.filter((_, index) => index !== indexToRemove));
    };

    const handleFormSubmit = () => {
        const data: SegmentStructure = {
            segment_name: segmentName,
            schema: selectedOptions
        };
        onSubmit(data);
    };

    return (
        <EuiForm id="segmentForm" component="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <EuiFormRow label="Enter the Name of the Segment"
                isInvalid={!!errors.segment_name}
                error={<EuiFormErrorText>{"Field should not be empty!"}</EuiFormErrorText>}
            >
                <EuiFieldText
                    isInvalid={!!errors.segment_name}
                    {...register('segment_name', { required: true })}
                    value={segmentName}
                    onChange={(e) => {
                        setSegmentName(e.target.value);
                        setValue('segment_name', e.target.value, { shouldValidate: true });
                        if (e.target.value.trim() !== '' && errors.segment_name) {
                            clearErrors('segment_name'); // Clear the error if the field is not empty
                        }
                    }}
                    placeholder="Name of the segment"
                    style={{ width: '250px', height: '30px', marginTop: '20px' }}
                />
            </EuiFormRow>
            <EuiSpacer />
            <p>To save your segment, you need to add the schemas to build the query</p>
            <EuiSpacer />

            <EuiFlexGroup gutterSize='xs' justifyContent='flexEnd' alignItems='flexEnd'>
                <EuiFlexItem grow={false}>
                    <EuiHealth textSize='xs' color='success'>- User Traits</EuiHealth>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiHealth textSize='xs' color="danger">- Group Traits</EuiHealth>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />

            <EuiFlexGroup direction="column" gutterSize='s'>
                <div style={{ border: '3px solid #C6DEF1', borderRadius: '4px', marginTop: '10px', padding: '10px' }}>
                    <EuiFlexGroup direction="column" gutterSize="s">
                        {selectedOptions.map((option, index) => (
                            <EuiFlexItem key={index}>
                                <EuiFlexGroup gutterSize="s" alignItems="center">
                                    <EuiFlexItem grow={false}>
                                        {index % 2 == 0 && <EuiHealth color='success' />}
                                        {index % 2 != 0 && <EuiHealth color='danger' />}
                                    </EuiFlexItem>
                                    <EuiFlexItem>
                                        <EuiSelect
                                            compressed
                                            options={[{ value: option.value, text: option.label }]}
                                            value={option.value}
                                            onChange={() => { }}
                                        />
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={false}>
                                        <EuiButtonIcon
                                            display='empty'
                                            iconType='minus'
                                            onClick={() => handleRemoveOption(index)}
                                            aria-label="Remove"
                                            style={{ border: 'none', color: '#75899F' }}
                                        />
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        ))}
                    </EuiFlexGroup>
                </div>

            </EuiFlexGroup>
            <EuiSpacer size='xs'/>
            <EuiFlexGroup gutterSize="s" alignItems="center">
                <EuiFlexItem grow={false}>
                    <EuiHealth color="subdued" />
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiSelect
                        options={[
                            { value: '', text: 'Add schema to segment' },
                            ...initialOptions
                                .filter(option => !selectedOptions.find(selected => selected.value === option.value))
                                .map(option => ({ value: option.value, text: option.label })),
                        ]}
                        value={newSchema}
                        onChange={(e) => setNewSchema(e.target.value)}
                        aria-label="Select schema"
                    />
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiButton onClick={handleAddSchema} size="s" style={{ background: 'none', border: 'none', color: '#41B494', textDecoration: 'underline' }}>+ Add new schema</EuiButton>
            <EuiSpacer />
        </EuiForm>
    );
};

export default SegmentForm;
