import React, { FunctionComponent } from 'react';
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiTitle, EuiIcon, EuiButton, EuiFlyoutFooter, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import SegmentForm from './SegmentForm';
import { schemaAPI } from './schemaApiService';
import { useForm } from 'react-hook-form';
import { SegmentSchema, SegmentStructure } from './schema';

interface FormFlyoutProps {
  initialOptions: SegmentSchema[];
  isFlyoutVisible?:boolean;
  onFlyoutTrigger : (isOpen:boolean)=>void
}

const FormFlyout: FunctionComponent<FormFlyoutProps> = ({ initialOptions,onFlyoutTrigger,isFlyoutVisible }) => {
  const { formState: { errors } } = useForm<SegmentStructure>();
  const sendData = async (jsonData:string) => {
    try {
      await schemaAPI.sendSchema(jsonData);
      console.log('Segment data sent successfully');
    } catch (error) {
      console.error('Error sending segment data:', error);
    }
  };


  const handleSaveSegment = (data: SegmentStructure) => {
    const objData = {
      segment_name: data.segment_name,
      schema: data.schema.map(option => ({ [option.value]: option.label })),
    };
    const jsonData = JSON.stringify(objData) //converting into json stringify for sending data with given format
    sendData(jsonData) //sending data over axios post request
    onFlyoutTrigger(false);
  };

  return (
    <React.Fragment>
    <div>
      {isFlyoutVisible && (
        <EuiFlyout ownFocus side="right" onClose={() => onFlyoutTrigger(false)} size="s">
          <EuiFlyoutHeader hasBorder style={{ backgroundColor: '#39AEBC' }}>
            <EuiTitle size="m">
              <h2 style={{ color: 'white', fontSize: '16px' }}><EuiIcon type="arrowLeft" /> Saving Segment</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <SegmentForm initialOptions={initialOptions} onSubmit={handleSaveSegment} />
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiButton size='s' type="submit" form="segmentForm" fill style={{ backgroundColor: '#06BE7D', color: 'white', border: 'none' }} disabled={!!errors.segment_name}>
                  Save the segment
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton size='s' onClick={() => {onFlyoutTrigger(false)
              }} style={{ backgroundColor: 'white', color: '#BD271E',border:'none' }
              }>
                  Cancel
                </EuiButton>
                </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      )}
    </div>
    </React.Fragment>
  );
};

export default FormFlyout;
