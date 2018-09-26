module.exports = {
  title: 'Zowe Docs',
  base: '/docs-site/',
  description: 'Home of Zowe documentation',
  ga: 'UA-123892882-1',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'FFi0biHTX9XKglMxt3n2NZkB-knrnPxIrgBXpIZqlzc'
      }
    ]
  ],
  themeConfig: {
    docsDir: 'docs',
    repo: 'https://github.com/zowe/docs-site',
    editLinks: true,
    editLinkText: 'Propose content change in GitHub.',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarDepth: 2,
    nav: [
      { text: 'Getting Started', link: '/get-started/overview' },
      { text: 'User Guide', link: '/user-guide/installandconfig' },
      { text: 'Extend Zowe', link: '/extend/mvd-extendingzlux' },
	  { text: 'Contribute', link: '/contribute/CONTRIBUTING' },
      { text: 'Zowe.org', link: 'https://zowe.org' }
    ],
    sidebar: {
      '/get-started/': [
		{
          title: 'Zowe overview',
          collapsable: true,
          children: ['overview']
        },
        {
          title: 'Release notes',
          collapsable: true,
          children: ['summaryofchanges']
        }
      ],
	  '/user-guide/': [
        {
          title: 'Installing Zowe',
          collapsable: true,
          children: [
            'installandconfig',
            'installroadmap',
            'systemrequirements',
            'gettingstarted',
            'install-zos',
            'cli-installcli',
            'troubleshootinstall',
            'uninstall'
          ]
        },
        {
          title: 'Configuring Zowe',
          collapsable: true,
          children: ['mvd-zluxconfiguration', 'cli-configuringcli']
        },
        {
          title: 'Using Zowe',
          collapsable: true,
          children: [
            'using',
            'usingzlux',
            'usingapis',
            'api-mediation-api-catalog',
            'cli-usingcli'
          ]
        }
      ],
      '/extend/': [
	    {
          title: 'Extending the Zowe Application Framework',
          collapsable: true,
          children: [
            'mvd-extendingzlux',
            'mvd-creatingappplugins',
            'mvd-plugindefandstruct',
            'mvd-dataservices',
            'mvd-desktopandwindowmgt',
            'mvd-configdataservice',
            'mvd-uribroker',
            'mvd-apptoappcommunication',
            'mvd-errorreportingui',
            'mvd-logutility'
          ]
        },
	    {
          title: 'Tutorial: Getting Started with zLUX',
          collapsable: true,
          children: ['overview', 'zlux-workshop-user-browser']
        },
		{
          title: 'Sample: zLUX Samples',
          collapsable: true,
          children: [
            'ui-intro',
            'iframe-sample',
            'react-sample',
            'angular-sample'
          ]
        },
		{
          title: 'Sample: Starter App Samples',
          collapsable: true,
          children: ['starter-intro', 'zlux-workshop-starter-app.md']
        },		
        {
          title: 'Extending Zowe CLI',
          collapsable: true,
          children: [
            'cli-extending',
            'cli-installplugins',
            'cli-cicsplugin',
            'cli-db2plugin'
          ]
        },
		{
          title: 'Tutorial: Coming Soon',
          collapsable: true,
          children: ['cli-developPlugins']
        },
		{
          title:
            'Tutorial: Onboard Spring Boot REST API services using Zowe API Mediation Layer',
          collapsable: true,
          children: ['api-mediation-usingapiml']
        },		
		{
          title: 'Tutorial: Provide Liberty APIs',
          collapsable: true,
          children: ['libertyAPI', 'ReactJSUI']
        },
        {
          title: 'Sample: API Extension Samples',
          collapsable: true,
          children: ['api-intro', 'liberty-api-sample']
        }
      ],
	  '/contribute/': [
		{
          title: 'How to contribute to documentation',
          collapsable: true,
          children: ['CONTRIBUTING']
        }
      ],
      '/': ['about']
    }
  }
}
