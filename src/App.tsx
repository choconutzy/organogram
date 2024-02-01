import React, { useLayoutEffect } from 'react';
import './App.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


function App() {
  useLayoutEffect(() => {
    var root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(70),
        height: am5.percent(70),
        layout: root.verticalLayout
      })
    );

    var series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        downDepth: 1,
        initialDepth: 1,
        singleBranchOnly: false,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "id",
      })
    );

    // Generate and set data
    var testData = [
        { 
          id: 'PETSU1',
          name: 'Subsidiary',
          isHaveChild: true,
          children: [
            {
              id: 'PETSUHA',
              name: 'PT Ha',
              isHaveChild: true,
              children: [
              {
                id: 'PETSUHA1',
                name: 'haha',
                value: 45,
                isHaveChild: false,
                url: 'https://twitter.com/'
              },                                   
              {
                id: 'PETSUHA2',
                name: 'haha',
                value: 20,
                isHaveChild: false,
                url: 'https://twitter.com/'
              },
              {
                id: 'PETSUHA3',
                name: 'haha',
                value: 18,
                isHaveChild: false,
                url: 'https://twitter.com/'
              },
              {
                name: 'PETSUHA4',
                value: 19,
                isHaveChild: false,
                url: 'https://twitter.com/'
              },
            ]
          },                                    
          {
            id: 'PETSU1HI',
            name: 'PT Hi', 
            isHaveChild: true,
            children: [
              {
                id: 'PETSU1HI1',
                name: 'haha',
                value: 1,
                isHaveChild: false,
                url: 'https://twitter.com/'
              },                                   
              {
                id: 'PETSU1HI1',
                name: 'haha',
                value: 8,
                isHaveChild: false,
                url: 'https://twitter.com/'
              },
            ]
          },
        ]
        },                            
        { 
          id: 'PETSC1',
          name: 'SCF', 
          isHaveChild: true,
          children: [
            {
              id: 'PETSC1HU',
              name: 'PT Hu', 
              isHaveChild: true,
              children: [
                {
                  id: 'PETSC1HU1',
                  name: 'haha',
                  value: 20,
                  isHaveChild: false,
                  url: 'https://twitter.com/'
                },                                   
                {
                  id: 'PETSC1HU2',
                  name: 'haha',
                  value: 6,
                  isHaveChild: true,
                  children: [
                    {
                      id: 'PETSC1HU2A',
                      name: 'haha',
                      value: 1,
                      isHaveChild: false,
                      url: 'https://twitter.com/'
                    },                                   
                    {
                      id: 'PETSC1HU2B',
                      name: 'haha',
                      value: 8,
                      isHaveChild: false,
                      url: 'https://twitter.com/'
                    },
                  ]
                },
              ]
            },
          ]
        },                            
        { 
          id: 'PETCO1',
          name: 'Consumer', 
          isHaveChild: true,
          children: [
            {
              id: 'PETCO1HE',
              name: 'PT he', 
              isHaveChild: true,
              children: [
                {
                  id: 'PETCO1HE1',
                  name: 'haha',
                  value: 80,
                  isHaveChild: false,
                  url: 'https://twitter.com/'
                },                                   
                {
                  id: 'PETSC1HE2',
                  name: 'haha',
                  value: 30,
                  isHaveChild: false,
                  url: 'https://twitter.com/'
                },
              ]
          },
          ]
        },
    ];
    var initData = [
      {
          id: 'PETSU1',
          name: 'Subsidiary',
          value: 2,
          isHaveChild: true,
      },            
      { 
          id:'PETSC1',
          name: 'SCF',
          value: 2,
          isHaveChild: true,
      },                            
      { 
          id:'PETCO1',
          name: 'Consumer',
          value: 2,
          isHaveChild: true,
      },
    ]
    var data = {
      name: "Pertamina",
      children: initData
    }
    series.nodes.template.events.on("click", (e:any) => {
      var dataItem = e.target.dataItem;
      // Dispose data if clicked when shift is pressed
      if (e.originalEvent.shiftKey) {
        console.log(e.originalEvent.shiftKey)
        series.disposeDataItem(dataItem);
      }
      else {
        // Set value of original data item to undefined, so that only child values would be used
        // dataItem.set("value", undefined);
        // dataItem.set("valueWorking", undefined);
        var name = dataItem.get("category");
        var count = dataItem.get("children", []).length;
        var id = dataItem.get("id");
        console.log("data item"+ dataItem.get("children", []));
        console.log(name, count, id);
        var newChild = testData.find(e => e?.id === id)?.children || [];
        var isHasChild = testData.find(e => e?.id === id)?.isHaveChild;
        console.log(newChild, isHasChild, testData.find(e => e?.id === id))
        if(newChild.length > 0) {
          series.addChildData(dataItem, [
            ...newChild
          ]);
        } else {
          console.log("the child hasn't child"+dataItem.get("id"))
        }
      }
    });
    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);
    // Make stuff animate on load
    // series.events.on('dataitemselected', (ev) => {
    //   console.log(ev.dataItem?.dataContext);
    // })

    return () => {
      root.dispose();
    };
  }, [])
  return (
    <div>
      <div id="chartdiv" style={{ width: "100vv", height: "100vh" }}></div>
    </div>
  );
}

export default App;
