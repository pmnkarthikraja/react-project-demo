import React, { FunctionComponent, useState } from 'react';
import { EuiTitle, EuiIcon, EuiButton } from '@elastic/eui';
import FormFlyout from './FormFlyout';
import { SegmentSchema } from './schema';

const initialOptions: SegmentSchema[] = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const SegmentPage: FunctionComponent = () => {
    const [isFlyoutVisible, setIsFlyoutVisible] = useState<boolean>(false);

  return (
    <React.Fragment>
    <div style={{ backgroundColor: '#39AEBC', padding: '20px' }}>
      <EuiTitle size="m">
        <h2 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <EuiIcon type="arrowLeft" /> View Audience
        </h2>
      </EuiTitle>
    </div>
    
    <EuiButton
        onClick={() => setIsFlyoutVisible(true)}
        fill={!isFlyoutVisible}
        style={!isFlyoutVisible ? { borderColor: 'black', color: 'white', marginTop:'100px',marginLeft:'100px' } : {  borderColor: 'white',marginTop:'100px',marginLeft:'100px' }}
      >
        Save Segment
      </EuiButton>
      {isFlyoutVisible && <FormFlyout initialOptions={initialOptions} onFlyoutTrigger={(isOpen)=>setIsFlyoutVisible(isOpen)} isFlyoutVisible={isFlyoutVisible} />}
    </React.Fragment>
  );
};

export default SegmentPage;
