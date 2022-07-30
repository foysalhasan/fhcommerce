import { createContext, useContext, useState } from 'react'

const templateToAdd = (templates, newTemplate) => {
  const exist = templates.find((el) => el.id == true)
  let id
  if (exist) {
    id = templates[0].id + 1
  } else {
    id = 1
  }
  return [...templates, { ...newTemplate, id: id }]
}

const templateToRemove = (templates, tempItem) => {
  return templates.filter((template) => template.id !== tempItem.id)
}

const templateContext = createContext({
  templates: [],
  setTemplates: () => {},
  addTemplate: () => {},
  removeTemplate: () => {},
})

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState([])

  // METHOD GOES TO FORM
  const addTemplate = (newTemplate) => {
    setTemplates(templateToAdd(templates, newTemplate))
  }

  const removeTemplate = (tempItem) => {
    setTemplates(templateToRemove(templates, tempItem))
  }

  // LOG

  const value = { addTemplate, templates, removeTemplate }
  return <templateContext.Provider value={value}>{children}</templateContext.Provider>
}

export const useTemplate = () => {
  return useContext(templateContext)
}
