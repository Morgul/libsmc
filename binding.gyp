{
  "targets": [
    {
      "target_name": "libsmc",
      "sources": [
      	"src/binding.cc",
      	"deps/libsmc/src/smc.c"
      ],
      "include_dirs": [
        "deps/libsmc/include",
        "<!(node -e \"require('nan')\")"
		  ],
      "link_settings": {
        'libraries': [
          'IOKit.framework'
        ]
      }
    }
  ]
}
