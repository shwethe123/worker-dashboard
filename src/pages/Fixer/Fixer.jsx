import React, { useState, useRef } from 'react';

import ReactDOM from 'react-dom';
import { Badge, Popover, Checkbox } from 'antd';
import { Advisor } from '@antv/ava';
import { ChartView } from 'antv-site-demo-rc';

function Fixer() {

    const errorSpec = {
        type: 'interval',
        data: [
          { type: 'furniture', sales: 38 },
          { type: 'food', sales: 52 },
          { type: 'fruit', sales: 61 },
          { type: 'lights', sales: 145 },
          { type: 'kitchen', sales: 48 },
          { type: 'garden', sales: 38 },
          { type: 'drink', sales: 38 },
          { type: 'pets', sales: 38 },
        ],
        encode: {
          x: 'type',
          y: 'sales',
        },
        scale: {
          y: { domainMin: 20 },
        },
        clip: true,
      };
      
      const myAdvisor = new Advisor();
      
      const App = () => {
        const chartRef = useRef(null);
      
        const [rules, setRules] = useState(myAdvisor.lint({ spec: errorSpec }));
        const [spec, setSpec] = useState(errorSpec);
      
        const checkFix = (e, checkedRuleId) => {
          const { checked } = e.target;
          setRules(
            rules.map((rule) => {
              if (rule.id === checkedRuleId) {
                if (checked) {
                  setSpec({
                    ...spec,
                    ...rule.fix,
                  });
                } else {
                  setSpec(errorSpec);
                }
      
                return {
                  ...rule,
                  checked,
                };
              }
              return rule;
            })
          );
        };
      
        const renderLinter =
          rules.length > 0 ? (
            <div>
              <h3>This chart has the following improvements</h3>
              <ul>
                {rules.map((rule) => (
                  <li key={rule.id}>
                    <div>{rule.docs.lintText}</div>
                    <div>
                      <Checkbox checked={rule.checked} onChange={(e) => checkFix(e, rule.id)}>
                        {rule.docs.fixText}
                      </Checkbox>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null;
          return (
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 8 }}>
                <ChartView chartRef={chartRef} spec={spec} style={{ height: '300px' }} />
              </div>
              <div style={{ flex: 2 }}>
                <Popover content={renderLinter} trigger="click" placement="top">
                  {rules.length > 0 ? (
                    <Badge count={rules.length} style={{ backgroundColor: '#873bf4', cursor: 'pointer' }} />
                  ) : (
                    <span>ChartLinter Loading...</span>
                  )}
                </Popover>
              </div>
            </div>
          );
        }
}

export default Fixer