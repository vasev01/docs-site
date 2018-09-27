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
          children: ['mvd-configuration', 'cli-configuringcli']
        },
        {
          title: 'Using Zowe',
          collapsable: true,
          children: [
            'using',
            'mvd-using',
            'usingapis',
            'api-mediation-api-catalog',
            'cli-usingcli'
          ]
        }
      ],
      '/extend/': [
	    {
          title: 'Guide: Extending Zowe Application Framework',
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
          title: 'Tutorials: Extending Zowe Application Framework',
          collapsable: true,
          children: ['tutorials/overview', 'tutorials/zlux-workshop-user-browser']
        },
		{
          title: 'Samples zLUX Samples',
          collapsable: true,
          children: [
            'samples/ui-intro',
            'samples/iframe-sample',
            'samples/react-sample',
            'samples/angular-sample'
          ]
        },
		{
          title: 'Samples: Starter App Samples',
          collapsable: true,
          children: ['samples/starter-intro', 'samples/zlux-workshop-starter-app.md']
        },		
        {
          title: 'Guide: Extending Zowe CLI',
          collapsable: true,
          children: [
            'cli-extending',
            'cli-installplugins',
            'cli-cicsplugin',
            'cli-db2plugin'
          ]
        },
		{
          title: 'Tutorials: Coming Soon',
          collapsable: true,
          children: ['tutorials/cli-developPlugins']
        },
		{
          title:
            'Tutorials: Onboard Spring Boot REST API services using Zowe API Mediation Layer',
          collapsable: true,
          children: ['tutorials/api-mediation-usingapiml']
        },		
		{
          title: 'Tutorials: Provide Liberty APIs',
          collapsable: true,
          children: ['tutorials/libertyAPI', 'tutorials/ReactJSUI']
        },
        {
          title: 'Samples: API Extension Samples',
          collapsable: true,
          children: ['tutorials/api-intro', 'samples/liberty-api-sample']
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
